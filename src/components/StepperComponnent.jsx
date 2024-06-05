import { Step, StepLabel, Stepper } from '@mui/material'

export default function StepperComponnent({ currentStep, options = [] }) {

  return (
    <Stepper activeStep={options.indexOf(currentStep)} alternativeLabel>
      {options.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
