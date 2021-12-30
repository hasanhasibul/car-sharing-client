import React, { useState } from 'react';
import Spinner from './Spinner';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useContext } from 'react';
import { MyContext } from './../App';
import { locationTo } from './../redux/actions/locationToAction';

const LocationSearchInputTo = ({setKm1}) => {

    const [address, setAddress] = useState();
    const [to,setTo,from,setFrom] = useContext(MyContext);

    const handleChange = address => {
        // this.setState({ address });
        setAddress(address)
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setTo(latLng)
            })
            .catch(error => console.error('Error', error));
    };
// console.log("To",to);
    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'To ...',
                            className: 'location-search-input form-control',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <Spinner />}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInputTo;