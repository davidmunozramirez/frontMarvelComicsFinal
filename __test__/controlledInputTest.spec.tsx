import { render, screen } from "@testing-library/react"
import ControlledInput from "dh-marvel/components/controlledInput/controlledInput"
import { ReactElement, FC, PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";

function renderWithReactHookForm(ui: ReactElement, {defaultValues = {}} = {}) {
    const Wrapper: FC<PropsWithChildren> = ({children}) => {
        const methods = useForm({defaultValues});
        return <FormProvider {...methods}>{children}</FormProvider>
    }
    return {
        ...render(ui, {wrapper: Wrapper})
    }
}

describe('ControlledTextInput', () => {
    describe('when rendering default', () => {
        it('should render a textbox', () => {
            renderWithReactHookForm(<ControlledInput name="firstname" label="Firstname" />);
            const textbox = screen.getByRole('textbox', {'name': 'Firstname'})
            expect(textbox).toBeInTheDocument();
            expect(textbox).toHaveValue('');
        })
        it('should render the default value', () => {
            renderWithReactHookForm(
                <ControlledInput name="firstname" label="Firstname" />,
                {defaultValues: {'firstname': 'TestUser'}}
            );
            const textbox = screen.getByRole('textbox', {'name': 'Firstname'})
            expect(textbox).toHaveValue('TestUser');
        })
    })
})