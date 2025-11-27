import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface ComparisonExercise {
  firstNumber: number;
  secondNumber: number;
  correctAnswer: 'more' | 'less' | 'equal';
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.2),
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    height: '40px',
    padding: theme.spacing(0.8),
    margin: theme.spacing(0.2)
  }
}));

const ComparisonText = styled(Typography)({
  fontFamily: 'Rubik',
  fontSize: '20px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '18px'
  }
});

const ComparisonGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '50%',
      flexBasis: '50%',
      maxWidth: '50%'
    }
  }
});

const generateComparison = (): ComparisonExercise => {
  // Generate two numbers up to 99
  const firstNumber = Math.floor(Math.random() * 99) + 1;
  const secondNumber = Math.floor(Math.random() * 99) + 1;
  
  let correctAnswer: 'more' | 'less' | 'equal';
  if (firstNumber > secondNumber) {
    correctAnswer = 'more';
  } else if (firstNumber < secondNumber) {
    correctAnswer = 'less';
  } else {
    correctAnswer = 'equal';
  }
  
  return { firstNumber, secondNumber, correctAnswer };
};

const generateExercises = (count: number): ComparisonExercise[] => {
  const exercises: ComparisonExercise[] = [];
  
  // Ensure we have at least one of each type
  const types: ('more' | 'less' | 'equal')[] = ['more', 'less', 'equal'];
  types.forEach(type => {
    let exercise: ComparisonExercise;
    do {
      const firstNumber = Math.floor(Math.random() * 99) + 1;
      const secondNumber = Math.floor(Math.random() * 99) + 1;
      
      let correctAnswer: 'more' | 'less' | 'equal';
      if (firstNumber > secondNumber) {
        correctAnswer = 'more';
      } else if (firstNumber < secondNumber) {
        correctAnswer = 'less';
      } else {
        correctAnswer = 'equal';
      }
      
      exercise = { firstNumber, secondNumber, correctAnswer };
    } while (exercise.correctAnswer !== type);
    
    exercises.push(exercise);
  });
  
  // Fill the rest randomly
  while (exercises.length < count) {
    exercises.push(generateComparison());
  }
  
  // Shuffle the array
  return exercises.sort(() => Math.random() - 0.5).slice(0, count);
};

interface EqualityComparisonProps {
  exerciseCount?: number;
}

export const EqualityComparison = ({ exerciseCount = 6 }: EqualityComparisonProps) => {
  const exercises = generateExercises(exerciseCount);

  return (
    <div>
      <ComparisonGrid container spacing={0.5}>
        {exercises.map((exercise, index) => (
          <Grid item xs={4} key={index}>
            <ExerciseBox elevation={0}>
              <ComparisonText>
                {exercise.firstNumber} _ {exercise.secondNumber}
              </ComparisonText>
            </ExerciseBox>
          </Grid>
        ))}
      </ComparisonGrid>
    </div>
  );
};

