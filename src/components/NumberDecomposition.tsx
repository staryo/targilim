import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface DecompositionExercise {
  sum: number;
  part1: number;
  part2: number;
  hidePosition: 'sum' | 'part1' | 'part2';
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.5),
  minHeight: '110px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    minHeight: '100px',
    padding: theme.spacing(1),
    margin: theme.spacing(0.25)
  }
}));

const NumberBox = styled('div')({
  border: '1px solid black',
  width: '45px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: 'bold',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    width: '40px',
    height: '40px',
    fontSize: '20px'
  }
});

const HebrewLabel = styled(Typography)({
  fontSize: '16px',
  direction: 'rtl',
  marginBottom: '2px',
  fontFamily: 'Rubik',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '14px'
  }
});

const PartsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '30px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '10px',
  '@media (max-width: 600px)': {
    gap: '20px',
    marginTop: '8px'
  }
});

const PartWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const DecompositionGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '100%', // Show 1 exercise per row on mobile
      flexBasis: '100%',
      maxWidth: '100%'
    }
  }
});

const generateDecomposition = (maxSum: number): DecompositionExercise => {
  const sum = Math.floor(Math.random() * (maxSum - 1)) + 2;
  const part1 = Math.floor(Math.random() * (sum - 1)) + 1;
  const part2 = sum - part1;
  const hidePosition = ['sum', 'part1', 'part2'][Math.floor(Math.random() * 3)] as 'sum' | 'part1' | 'part2';
  
  return { sum, part1, part2, hidePosition };
};

const generateExercises = (count: number, maxSum: number): DecompositionExercise[] => {
  return Array.from({ length: count }, () => generateDecomposition(maxSum));
};

interface NumberDecompositionProps {
  exerciseCount?: number;
  maxSum?: number;
}

export const NumberDecomposition = ({ exerciseCount = 6, maxSum = 20 }: NumberDecompositionProps) => {
  const exercises = generateExercises(exerciseCount, maxSum);

  return (
    <DecompositionGrid container spacing={1}>
      {exercises.map((exercise, index) => (
        <Grid item xs={6} key={index}>
          <ExerciseBox elevation={0}>
            <div>
              <HebrewLabel>שלם</HebrewLabel>
              <NumberBox>
                {exercise.hidePosition === 'sum' ? '' : exercise.sum}
              </NumberBox>
            </div>
            <PartsContainer>
              <PartWrapper>
                <HebrewLabel>חלק 1</HebrewLabel>
                <NumberBox>
                  {exercise.hidePosition === 'part1' ? '' : exercise.part1}
                </NumberBox>
              </PartWrapper>
              <PartWrapper>
                <HebrewLabel>חלק 2</HebrewLabel>
                <NumberBox>
                  {exercise.hidePosition === 'part2' ? '' : exercise.part2}
                </NumberBox>
              </PartWrapper>
            </PartsContainer>
          </ExerciseBox>
        </Grid>
      ))}
    </DecompositionGrid>
  );
}; 