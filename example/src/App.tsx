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

const logoUrl =
  'https://raw.githubusercontent.com/AhmedMKamal/react-interactive-form/master/example/public/logo.png';

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
          <img
            src={logoUrl}
            className='block w-10 h-10 -mb-10 z-10'
            alt='Logo'
          />
          <Form onSubmit={handleSubmit}>
            <FormStage name='name-and-email'>
              <FormText>
                Hello, Your name is
                <FormInput type='text' name='name' placeholder='John Doe' />
              </FormText>
              <FormText>
                and you would like to sign up with the email address
                <FormInput
                  type='email'
                  name='email'
                  placeholder='example@me.com'
                />
              </FormText>
            </FormStage>
            <FormStage name='password'>
              <FormText>
                Create a strong password with mix of characters and numbers
                <FormInput
                  type='password'
                  name='password'
                  placeholder='******'
                />
              </FormText>
            </FormStage>
            <FormStage name='submit'>
              <FormText>
                Great, you're all set.
                <FormButton>
                  <div className='inline-flex items-center'>
                    Create account&nbsp;
                    <NextIcon />
                  </div>
                </FormButton>
              </FormText>
            </FormStage>
          </Form>
        </FormContainer>
      </FormCard>
    </main>
  );
};

function NextIcon(): JSX.Element {
  return (
    <svg
      viewBox='0 0 492.004 492.004'
      className='fill-current h-full w-4'
      x='0px'
      y='0px'
    >
      <path
        d='M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z'
      />
    </svg>
  );
}

export default App;
