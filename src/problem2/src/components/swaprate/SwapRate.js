import React, { useEffect, useState } from "react";
import "./index.css";
import { fetchIcons } from "./iconFetcher";
import { useDispatch } from 'react-redux';
import { setPriceRateFrom } from "../../redux-store/slices/priceRateFromSlice";
import { setPriceRateTo } from "../../redux-store/slices/priceRateToSlice";

const SwapRate = (props) => {
    const [icons, setIcons] = useState({});
    const dispatch = useDispatch();

    const upDatePriceRate = () => {
        dispatch(setPriceRateFrom(props.fromRate));
        dispatch(setPriceRateTo(props.toRate));
    }

    useEffect(() => {
        if (!props.from || !props.to) {
            return;
        }
        async function fetchAndUseIcons() {
            const icons = await fetchIcons(props.from, props.to);
            setIcons(icons)
        }
        fetchAndUseIcons();
        upDatePriceRate();
    }, [props.from, props.to]);

    return (
        <div>
            <h3>Swap Rate</h3>
            <div className="swaprate-result">
                <div>
                    <span style={{ color: "red" }}>{props.fromRate}</span>
                    <span>
                        {props.from}&nbsp;
                        {
                            icons[props.from] &&
                            <img src={icons[props.from]?.download_url} alt=""></img>
                        }
                    </span>
                </div>

                <span>&nbsp;To</span>

                <div>
                    <span style={{ color: "green" }}>{props.toRate}</span>
                    <span>
                        {props.to}&nbsp;
                        {
                            icons[props.to] &&
                            <img src={icons[props.to]?.download_url} alt=""></img>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SwapRate;
