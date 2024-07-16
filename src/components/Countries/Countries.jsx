import { useEffect } from "react";
import { useState } from "react";
import Country from "../Country/Country";
import './Countries.css';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [visitedFlags, setVisitedFlags] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data));
    }, [])


    const handleVisitedCountry = country => {
        console.log('add this to your visited country');
        const newVisitedCountries = [...visitedCountries, country];
        setVisitedCountries(newVisitedCountries);
    }
    const handleRemovingVisitedCountry = country => {
        console.log('remove this from your visited country');
        const newVisitedCountries = [...visitedCountries];
        // const indexToRemove = newVisitedCountries.findLastIndex(c => c === country);
        // if (indexToRemove !== -1) {
        //     newVisitedCountries.splice(indexToRemove, 1);
        // }
        // setVisitedCountries(newVisitedCountries);
        const indexToRemove  = newVisitedCountries.findLastIndex(c => c === country);
        setVisitedCountries(newVisitedCountries.filter((c, index) => index   !== indexToRemove));
    }
    const handleAddingAfterTheLastOfItsKindInTheVisitedCountry = country => {
        console.log('add this after the last of its kind to your visited country');
        const newVisitedCountries = [...visitedCountries];
        // const indexToAddAfter = newVisitedCountries.findLastIndex(c => c === country);
        // if (indexToAddAfter !== -1) {
        //     newVisitedCountries.splice(indexToAddAfter, 0, country);
        // } else {
        //     newVisitedCountries.push(country);
        // }
        // setVisitedCountries(newVisitedCountries);
        const insertAt = newVisitedCountries.findLastIndex(c => c === country);
        if (insertAt !== -1) {
            setVisitedCountries([...newVisitedCountries.slice(0, insertAt), country, ...newVisitedCountries.slice(insertAt)]);
            return;
        } else {
            newVisitedCountries.push(country);
            setVisitedCountries(newVisitedCountries);
        }
    }
    const handleRemovingTheLastOneFromTheVisitedCountry = () => {
        console.log('remove the last one from your visited country');
        const newVisitedCountries = [...visitedCountries];
        newVisitedCountries.pop();
        setVisitedCountries(newVisitedCountries);
    }

    const handleVisitedFlags = flag => {
        const newVisitedFlags = [...visitedFlags, flag];
        setVisitedFlags(newVisitedFlags);
    }

    // remove item from an array in a state
    // use filter to select all the elements except the one you want to remove

    

    return (
        <div>
            <h3>Countries: {countries.length}</h3>
            {/* visited country */}
            <div>
                <h5>Visited countries: {visitedCountries.length}</h5>
                <ul>
                    {
                        visitedCountries.map((country, index) => <li
                            key={country.cca3+`${index}`}>{country.name.common}</li>)
                    }
                </ul>
            </div>
            <div>
                <button onClick={handleRemovingTheLastOneFromTheVisitedCountry}>Remove the Last One</button>
            </div>
            <div className="flag-container">
                {
                    visitedFlags.map((flag, idx) => <img key={idx} src={flag}></img>)
                }
            </div>
            {/* display countries */}
            <div className="country-container">
                {
                    countries.map(country => <Country
                        key={country.cca3}
                        handleVisitedCountry={handleVisitedCountry}
                        handleRemovingVisitedCountry={handleRemovingVisitedCountry}
                        handleAddingAfterTheLastOfItsKindInTheVisitedCountry={handleAddingAfterTheLastOfItsKindInTheVisitedCountry}
                        handleVisitedFlags={handleVisitedFlags}
                        country={country}></Country>)
                }
            </div>
        </div>
    );
};

export default Countries;