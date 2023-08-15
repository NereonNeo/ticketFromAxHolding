declare namespace JSX {
    interface ExtendedButton
        extends React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > {
        customAttribute?: string;
    }

    interface IntrinsicElements {
        button: ExtendedButton;
    }
}