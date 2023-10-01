import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos/Switcheo/token-icons/contents/tokens/';

// Function to fetch the "from" icon
async function fetchFromIcon(from) {
  try {
    const fromIconUrl = `${BASE_URL}${from}.svg`;
    const fromSvgResponse = await axios.get(fromIconUrl);
    
    if (fromSvgResponse.status === 200) {
      return fromSvgResponse.data;
    } else {
      return '';
    }
  } catch (error) {
    console.error(`Error fetching ${from} icon:`, error);
    return '';
  }
}

// Function to fetch the "to" icon
async function fetchToIcon(to) {
  try {
    const toIconUrl = `${BASE_URL}${to}.svg`;
    const toSvgResponse = await axios.get(toIconUrl);
    
    if (toSvgResponse.status === 200) {
      return toSvgResponse.data;
    } else {
      return '';
    }
  } catch (error) {
    console.error(`Error fetching ${to} icon:`, error);
    return '';
  }
}

// Function to fetch both "from" and "to" icons
export async function fetchIcons(from, to) {
  const [fromIcon, toIcon] = await Promise.all([
    fetchFromIcon(from),
    fetchToIcon(to)
  ]);

  return {
    [from]: fromIcon,
    [to]: toIcon
  };
}
