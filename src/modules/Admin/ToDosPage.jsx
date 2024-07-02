import BackgroundLayout from '../../layouts/BackgroundLayout'
import TodoCalendar from './components/ToDoCalender'


const background = "images/Layouts/RequestBackground.png"

export const ToDosPage = () => {
  return (
    <BackgroundLayout image={background} style={{alignItems: 'flex-end'}} >
      <TodoCalendar />
    </BackgroundLayout>
  )
}



