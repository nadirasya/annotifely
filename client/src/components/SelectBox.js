import React from 'react';

const SelectBox = ({label1, label2, label3, label4, disabled, selected, handleSelected, index}) => {

  const handleChange = (event) => {
    // console.log(event.target.value)
    handleSelected(event)
    // setScore(event.target.value);
  };

  return (
    <div>
    <select name={String(index)} style={{width: '100%', padding: 5, borderRadius: '5px', borderColor: '#CFCFCF'}} onChange={handleChange} disabled={disabled} value={selected}>
      <option value="0">Please select one</option>
      <option value="1">{label1}</option>
      <option value="2">{label2}</option>
      <option value="3">{label3}</option>
      <option value="4">{label4}</option>
    </select>
  </div>
  );
}

export default SelectBox;
