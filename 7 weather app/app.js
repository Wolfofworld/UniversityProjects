function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {if (window.CP.shouldStopExecution(0)) break;var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}window.CP.exitedLoop(0);return target;};return _extends.apply(this, arguments);}import * as reactIcons from "https://cdn.skypack.dev/react-icons@4.2.0";

const { useState, useEffect, useReducer, useContext, createContext } = React;

const { Form, Select, Spin, Switch, Tooltip } = antd;

/* 
----------------------------------------------------------
State Management------------------------------------------
----------------------------------------------------------
*/

const initialState = {
  current: {},
  forecast: [],
  loaded: false,
  location: "" };


const actions = {
  setForecast: "SET_FORECAST" };


const reducer = (state, action) => {
  switch (action.type) {
    case actions.setForecast:
      const {
        payload: { forecast, current, location } } =
      action;

      return {
        ...state,
        forecast,
        current,
        location,
        loaded: true };

    default:
      return {
        ...state };}


};

/* 
----------------------------------------------------------
Helper Functions------------------------------------------
----------------------------------------------------------
*/

const formatDate = str => {
  str = str.split("-");
  return `${str[1]}/${str[2]}/${str[0]}`;
};

const getDay = (active, forecast) =>
!active ?
"Today" :
days[new Date(formatDate(forecast[active].date)).getDay()];

/* 
----------------------------------------------------------
Data------------------------------------------
----------------------------------------------------------
*/

const days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"];


/* 
----------------------------------------------------------
Context------------------------------------------
----------------------------------------------------------
*/

const WeatherContext = createContext({
  state: undefined,
  dispatch: undefined });


const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [farenheit, setFarenheit] = useState(true);
  const [active, setActive] = useState(0);

  const fetchForecast = (coordinates = "27.7676, -82.6403") => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=60a1e58642e34987a6c224405212402&q=${coordinates}&days=5&aqi=no&alerts=no`;

    axios.
    get(url).
    then(({ data: { current, forecast, location } }) => {
      dispatch({
        type: actions.setForecast,
        payload: {
          forecast: forecast.forecastday,
          current,
          location: `${location.name}, ${location.region}` } });


    }).
    catch(err => {
      throw new Error(err);
    });
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return /*#__PURE__*/(
    React.createElement(WeatherContext.Provider, {
      value: {
        active,
        setActive,
        dispatch,
        farenheit,
        setFarenheit,
        fetchForecast,
        state } },


    children));


};

/* 
----------------------------------------------------------
Component Tree------------------------------------------
----------------------------------------------------------
*/

const App = () => /*#__PURE__*/
React.createElement("section", { className: "weather" }, /*#__PURE__*/
React.createElement("section", { className: "weather__widget" }, /*#__PURE__*/
React.createElement(Header, null), /*#__PURE__*/
React.createElement(Content, null)));




const Header = () => {
  const {
    active,
    state: { current, forecast, loaded } } =
  useContext(WeatherContext);

  let currentDay;
  let formattedDate;
  let icon;

  if (loaded) {
    currentDay = getDay();
    formattedDate = formatDate(forecast[active].date);
    icon = current.condition.icon;
  }

  return /*#__PURE__*/(
    React.createElement("header", { className: "weather__header" }, /*#__PURE__*/
    React.createElement("section", { className: "weather__header-details" }, /*#__PURE__*/
    React.createElement("img", {
      src: icon,
      className: "weather__header-icon",
      alt: "",
      role: "presentation" }), /*#__PURE__*/

    React.createElement("section", { className: "weather__header-stamp" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__header-today" }, currentDay), /*#__PURE__*/
    React.createElement("span", { className: "weather__header-date" }, formattedDate))),


    loaded && /*#__PURE__*/React.createElement(Search, null)));


};

const Search = () => {
  const {
    fetchForecast,
    state: { location } } =
  useContext(WeatherContext);
  const [options, setOptions] = useState([]);
  const { Option } = Select;

  const handleSearch = value => {
    axios.
    get(
    `https://api.weatherapi.com/v1/search.json?key=60a1e58642e34987a6c224405212402&q=${value}`).

    then(res => setOptions(res.data)).
    catch(err => console.log(err));
  };

  return /*#__PURE__*/(
    React.createElement(Form, {
      className: "weather__form",
      initialValues: {
        location: location },

      onFinish: values => fetchForecast(values) }, /*#__PURE__*/

    React.createElement(Tooltip, {
      placement: "right",
      title:
      "Retrieve the forecast for your destination by searching by city and state (St. Pete, FL) or zip code (5 Digit Numerical)" }, /*#__PURE__*/


    React.createElement(Form.Item, {
      name: "location",
      className: "weather__form-item",
      rules: [
      {
        required: true,
        message: "This field cannot be empty" }] }, /*#__PURE__*/



    React.createElement(Select, {
      showSearch: true,
      bordered: false,
      placeholder: "Search by Location",
      notFoundContent: null,
      onSearch: value => handleSearch(value),
      onSelect: value => {
        let selected = options.find(option => option.name === value);
        let coordinates = `${selected.lat}, ${selected.lon}`;
        fetchForecast(coordinates);
      },
      suffixIcon: /*#__PURE__*/
      React.createElement("i", { class: "fas fa-map-marker-alt weather__details-icon" }) },


    options.length &&
    options.map((option) => /*#__PURE__*/
    React.createElement(Option, { key: option.id, value: option.name },
    option.name)))))));







};

const Content = () => {
  const {
    active,
    farenheit,
    setFarenheit,
    state: { current, forecast, loaded } } =
  useContext(WeatherContext);

  return /*#__PURE__*/(
    React.createElement("main", {
      className: `weather__content ${
      !loaded ? "weather__content--loading" : ""
      }` },

    loaded ? /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(Current, null), /*#__PURE__*/
    React.createElement("section", { className: "weather__container" }, /*#__PURE__*/
    React.createElement(Switch, {
      defaultChecked: true,
      checkedChildren: "F\xB0",
      unCheckedChildren: "C\xB0",
      onChange: () => setFarenheit(!farenheit) }), /*#__PURE__*/

    React.createElement(Details, {
      current: current,
      farenheit: farenheit,
      forecast: forecast,
      active: active })), /*#__PURE__*/


    React.createElement(Forecast, null)) : /*#__PURE__*/


    React.createElement(Spin, { size: "large" })));



};

const Current = () => {
  const {
    active,
    farenheit,
    state: { current, forecast } } =
  useContext(WeatherContext);
  const currentCondition = current.condition.text;

  const renderCurrent = () =>
  active && farenheit ?
  forecast[active].day.avgtemp_f :
  active && !farenheit ?
  forecast[active].day.avgtemp_c :
  current && farenheit ?
  current.temp_f :
  current && !farenheit ?
  current.temp_c :
  null;

  return /*#__PURE__*/(
    React.createElement("section", { className: "weather__current" }, /*#__PURE__*/
    React.createElement("section", { className: "weather__current-condition" },
    currentCondition), /*#__PURE__*/

    React.createElement("section", { className: "weather__current-text" },
    renderCurrent(), /*#__PURE__*/
    React.createElement("span", { className: "weather__current-degree" }, "\xB0"))));



};

const Details = () => {
  const {
    active,
    farenheit,
    state: { current, forecast } } =
  useContext(WeatherContext);

  const feelsLike = active ?
  "N/A" :
  current && farenheit ?
  current.feelslike_f :
  current.feelslike_c;

  return /*#__PURE__*/(
    React.createElement("section", { className: "weather__details" }, /*#__PURE__*/
    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { class: "fas fa-temperature-high weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "Feels Like"), /*#__PURE__*/
    React.createElement("span", null, feelsLike, "\xB0"))), /*#__PURE__*/


    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { class: "fas fa-umbrella weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "Chance of Rain"), /*#__PURE__*/
    React.createElement("span", null, forecast[active].day.daily_chance_of_rain, "%"))), /*#__PURE__*/


    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { class: "fas fa-tint weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "Humidity"), /*#__PURE__*/
    React.createElement("span", null, forecast[active].day.avghumidity, "%"))), /*#__PURE__*/


    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-wind weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "Wind (mph)"), /*#__PURE__*/
    React.createElement("span", null, forecast[active].day.maxwind_mph))), /*#__PURE__*/


    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-sun weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "UV"), /*#__PURE__*/
    React.createElement("span", null, forecast[active].day.uv))), /*#__PURE__*/


    React.createElement("section", { className: "weather__detail" }, /*#__PURE__*/
    React.createElement("i", { class: "fas fa-snowflake weather__details-icon" }), /*#__PURE__*/
    React.createElement("section", { className: "weather__details-item" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__details-label" }, "Chance of Snow"), /*#__PURE__*/
    React.createElement("span", null, forecast[active].day.daily_chance_of_snow, "%")))));




};

const Forecast = () => {
  const { state } = useContext(WeatherContext);

  return /*#__PURE__*/(
    React.createElement("section", { className: "weather__forecast" },
    state.forecast.
    filter((_daily, index) => index < 3).
    map((daily, index) => /*#__PURE__*/
    React.createElement(Card, _extends({ key: index }, state, daily, { index: index })))));



};

const Card = ({ index, day, date }) => {
  const { active, farenheit, setActive } = useContext(WeatherContext);
  return /*#__PURE__*/(
    React.createElement("section", {
      onClick: () => setActive(index),
      className: `weather__card ${
      active === index ? "weather__card--active" : ""
      }` }, /*#__PURE__*/

    React.createElement("img", {
      className: "weather__card-icon",
      src: day.condition.icon,
      alt: "",
      role: "presentation" }), /*#__PURE__*/

    React.createElement("span", { className: "weather__card-text" },
    days[new Date(formatDate(date)).getDay()]), /*#__PURE__*/

    React.createElement("span", { className: "weather__card-text weather__card-text--avg" },
    farenheit ? day.avgtemp_f : day.avgtemp_c, /*#__PURE__*/
    React.createElement("span", { className: "weather__card-degree" }, "\xB0")), /*#__PURE__*/

    React.createElement("section", { className: "weather__card-details" }, /*#__PURE__*/
    React.createElement("span", { className: "weather__card-text weather__card-text--min" },
    farenheit ? day.mintemp_f : day.mintemp_c, "\xB0"), /*#__PURE__*/

    React.createElement("span", { className: "weather__card-text weather__card-text--max" },
    farenheit ? day.maxtemp_f : day.maxtemp_c, "\xB0"))));




};

ReactDOM.render( /*#__PURE__*/
React.createElement(WeatherProvider, null, /*#__PURE__*/
React.createElement(App, null)),

document.getElementById("root"));