import {useCallback, useEffect, memo} from "react";

import testStore from 'services/store/zustand/test';
import shallow from 'zustand/shallow';

import {LUXSnackbar} from "luna-rocket";

const SnackBar = () => {
     const [
         snackbarMessage, snackbarOpen, snackbarType, setSnackbar
     ] = testStore(state => [
         state.snackbarMessage, state.snackbarOpen, state.snackbarType, state.setSnackbar
     ], shallow);

     const handleSnackbarClose = useCallback(() => {
            setSnackbar({snackbarOpen: false});
    },[snackbarOpen])

    useEffect(() => {},[snackbarMessage, snackbarOpen, snackbarType])

     return (
           <LUXSnackbar
                message={snackbarMessage}
                onRequestClose={handleSnackbarClose}
                open={snackbarOpen}
                type={snackbarType}
            />
     )
}

export default memo(SnackBar);