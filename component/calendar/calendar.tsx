import MonthButton from '../ui/month-button';
import styled from 'styled-components';

const Calendar = () => {
  return (
    <Container>
      <Month>
        <h2>monthName</h2>
        <MonthButton />
      </Month>
    </Container>
  );
};

const Container = styled.section`
  margin: 0 auto;
  flex-basis: 400px;
  margin: 0 1em;
`;

const Month = styled.div`
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2em;
    margin: 0.5em 0 1em 0;
  }
`;

// const Week = styled.div`
//   font-size: 1em;
//   font-weight: 400;
//   padding: 0 0.8em;
//   color: ${({ theme }) => theme.color.gray};
//   margin-bottom: 0.6em;
// `;

// const Space = styled.div`
//   width: 50px;
//   height: 50px;
//   margin-bottom: 0.5em;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   -webkit-box-pack: center;
//   -webkit-box-align: center;
// `;

// const Flexbox = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   gap: ${(props) => props.gap};
//   margin-bottom: 1em;
// `;

export default Calendar;
