import Calendar from '../component/calendar/calendar';
import Intro from '../component/intro/intro';
import Card from '../component/layout/card';
import Task from '../component/task/task';

const HomePage = () => {
  return (
    <Card>
      <Intro />
      <Calendar />
      <Task />
    </Card>
  );
};
export default HomePage;
