import React, { useMemo } from 'react';
import WalletRow from './WalletRow';

{/* All interface should be store in a specific directory such as /src/interface/category/*/ }

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

//if it just have this can set to string type instead, so it still work without define a seperate interface
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends BoxProps { }//why need this?

const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {
    const balances = useWalletBalances();
    const prices = usePrices();


    //switch case should be wirte in separate hooks or function file ( import it ex: import { getPriority } from 'path/to/getPriorty')
    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100;
            case 'Ethereum':
                return 50;
            case 'Arbitrum':
                return 30;
            case 'Zilliqa':
            case 'Neo':
                return 20;
            default:
                return -99;
        }
    };

    //Oldversion
    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
                return balancePriority > -99 && balance.amount <= 0;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                return rightPriority - leftPriority;
            });
    }, [balances, prices]);



    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
    }));


    //The `useMemo` hook remains the same, but instead of using an arrow function, I call the `getSortedBalances` function and pass in the `balances` and `prices` as arguments.
    //Dont use UseMemo() before you map it, its may still cause some memory leak because it already check the previous value then map is useless
    //new version:
    const getSortedBalances = (balances, prices) => {
        const filteredBalances = balances.filter((balance) => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount <= 0;
        });

        const sortedBalances = filteredBalances.sort((lhs, rhs) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
        });

        return sortedBalances.map((balance) => ({
            ...balance,
            formatted: balance.amount.toFixed(2),
        }));
    };

    const sortedBalances = useMemo(() => {
        return getSortedBalances(balances, prices);
    }, [balances, prices]);


    
    //This component only return to this : walletRow component its still good to write it down to the Dom return of this file.
    //or can be written in a separate hooks folder for this component (module)
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        );
    });

    return
    <div {...rest}>
        {/* Component WalletRow is fine to be render here */}

        {/* formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
    }); */}

        {rows}
    </div>;
};

export default WalletPage;