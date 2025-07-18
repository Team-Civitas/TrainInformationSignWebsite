import Select, { components } from 'react-select';
import './Myselect.css';

const CustomOption = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%'
      }}>
        {data.flag && (
          <img src={data.flag} alt="" style={{ width: '1.2em', height: '1.2em' }} />
        )}
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%'
      }}>
        {data.flag && (
          <img src={data.flag} alt="" style={{ width: '1.2em', height: '1.2em' }} />
        )}
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

export default function MySelect({ options, value, onChange, placeholder }) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='DefaultSelect'
      classNamePrefix="react-select"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#c2c2c2'
        }
      })}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue
      }}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? '#ffffff'
               : state.isFocused ? '#ffffff'
               : '#000000',
          backgroundColor: state.isSelected ? '#4D4D4D'
                        : state.isFocused ? '#7B7B7B'
                        : '#ffffff',
          ':active': { backgroundColor: '#4D4D4D' }
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#000000'
        })
      }}
    />
  );
}
