import PropTypes from 'prop-types';

const formatNumber = (number) => {
    for (let i = 1; i == number.length; i++) {
        if (i % 2 === 0 && i === number.length) number[i] = `${number[i]}-`
    }
    return number;
};

const List = ({ listItems }) => {
  return (
    <ul>
        {listItems.map((listItem, index) => <li key={index}>
            <b>{listItem.email}</b>: {formatNumber(listItem.number)}
        </li>)}
    </ul>
  )
}

List.propTypes = {
  listItems: PropTypes.array
}

List.defaultProps = {
  listItems: []
}

export default List;