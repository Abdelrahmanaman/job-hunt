"use client";

import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "./ui/input";


export const LocationInput = () => {
  const {

    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

  
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className="" key={place_id} onClick={handleSelect(suggestion)}>
          <strong className="text-purple-700">{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <Input
        className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter Location"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul className="space-y-4 mt-4 p-2 rounded-lg overflow-y-scroll h-40 w-64">{renderSuggestions()}</ul>}
    </div>
  );
};
