/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { useState, useEffect } from "react";
import api from "../apis/api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const [tag, setTag] = useState([]);

  const mapTags = tag.map((elem, i) => {
    return { tagUser: elem.profileName };
  });

  useEffect(() => {
    async function fetchTag() {
      try {
        const response = await api.get("/alluser");
        setTag([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTag();
  }, []);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={mapTags}
      disableCloseOnSelect
      getOptionLabel={(option) => option.tagUser}
      renderOption={(option, { selected }) => (
        <li>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.tagUser}
        </li>
      )}
      onChange={props.onChange}
      style={{ width: 300 }}
      renderInput={(params, i) => (
        //   console.log( params.InputProps.startAdornment[0].props.label ),
        //   {params.InputProps.startAdornment[i].props.label},
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}
