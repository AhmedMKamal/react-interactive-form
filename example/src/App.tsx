import * as React from 'react';
import {
  Form,
  FormButton,
  FormCard,
  FormContainer,
  FormInput,
  FormPanel,
  FormPanelCard,
  FormPanelContainer,
  FormPanelLink,
  FormPanelText,
  FormPanelTitle,
  FormStage,
  FormText
} from 'react-interactive-form';
import 'react-interactive-form/dist/index.css';

const App = () => {
  const handleSubmit = (values: object): void => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <main className='flex w-full max-w-screen-lg min-h-full lg:min-h-3/4'>
      <FormCard>
        <FormPanel>
          <FormPanelContainer>
            <FormPanelTitle>Sign up</FormPanelTitle>
            <FormPanelText>
              Get started in a few clicks and enjoy latest news from all around
              the world.
            </FormPanelText>
          </FormPanelContainer>
          <FormPanelCard>
            <FormPanelText>Have an account?</FormPanelText>
            <FormPanelLink href={'/'}>Login</FormPanelLink>
          </FormPanelCard>
        </FormPanel>
        <FormContainer>
          <img src={'/logo.png'} className='block w-10 h-10' alt='Logo' />
          <Form onSubmit={handleSubmit}>
            <FormStage name='name-and-email'>
              <FormText>Your name is</FormText>
              <FormInput type='text' />
              <FormText>
                and you would like to sign up with the email address
              </FormText>
              <FormInput type='email' />
            </FormStage>
            <FormStage name='password'>
              <FormText>
                Create a strong password with mix of characters and numbers
              </FormText>
              <FormInput type='password' />
            </FormStage>
            <FormStage name='submit'>
              <FormButton>Submit</FormButton>
            </FormStage>
          </Form>
        </FormContainer>
      </FormCard>
    </main>
  );
};

export default App;
