export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Theme =
    | 'default'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export type ComponentBase = {
    isDisabled?: boolean;
    classname?: string;
    theme?: Theme;
    size?: Size;
};