import { useSnackbar as useOriginalSnackbar } from 'notistack';

const useSnackbar = (config = {}) => {
    const { enqueueSnackbar } = useOriginalSnackbar();
    const showSnackbar = (msg, options = {}) =>
        enqueueSnackbar(msg, {
            variant: 'info',
            ...config,
            ...options,
        });

    return showSnackbar;
};

export default useSnackbar;
