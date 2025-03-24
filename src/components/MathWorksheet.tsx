import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface Exercise {
  firstNumber: number;
  secondNumber: number;
  operation: '+' | '-';
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.5),
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    height: '40px',
    fontSize: '18px',
    padding: theme.spacing(1),
    margin: theme.spacing(0.25)
  }
}));

const HebrewTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  direction: 'rtl',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    fontSize: '20px',
    marginBottom: '15px'
  }
});

const ExerciseText = styled(Typography)({
  fontFamily: 'Rubik',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '18px'
  }
});

const ExerciseGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '50%', // Show 2 exercises per row on mobile
      flexBasis: '50%',
      maxWidth: '50%'
    }
  }
});

const generateRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

const generateExercise = (maxResult: number): Exercise => {
  const operation = Math.random() < 0.5 ? '+' : '-';
  let firstNumber: number;
  let secondNumber: number;

  if (operation === '+') {
    firstNumber = generateRandomNumber(maxResult - 1);
    secondNumber = generateRandomNumber(maxResult - firstNumber);
  } else {
    firstNumber = generateRandomNumber(maxResult);
    secondNumber = generateRandomNumber(firstNumber);
  }

  return { firstNumber, secondNumber, operation };
};

const generateExercises = (count: number, maxResult: number): Exercise[] => {
  return Array.from({ length: count }, () => generateExercise(maxResult));
};

interface MathWorksheetProps {
  exerciseCount?: number;
  maxResult?: number;
}

export const MathWorksheet = ({ exerciseCount = 21, maxResult = 20 }: MathWorksheetProps) => {
  const exercises = generateExercises(exerciseCount, maxResult);

  return (
    <div>
      <HebrewTitle>תרגילי חשבון</HebrewTitle>
      <ExerciseGrid container spacing={1}>
        {exercises.map((exercise, index) => (
          <Grid item xs={4} key={index}>
            <ExerciseBox elevation={0}>
              <ExerciseText>
                {exercise.firstNumber} {exercise.operation} {exercise.secondNumber} =
              </ExerciseText>
            </ExerciseBox>
          </Grid>
        ))}
      </ExerciseGrid>
    </div>
  );
}; 