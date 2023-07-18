import testStore from "services/store/zustand/test";
import shallow from "zustand/shallow";

const CommonLUXComponentTest = () => {
    const [
        setSnackbar, setProgress
    ] = testStore(state => [
        state.setSnackbar, state.setProgress
    ], shallow);

    const handleProgressTimeout = () => {
        setProgress({progressOpen: true, progressSize: 200, progressText: 'Loading...'});


        setTimeout(() => {
            setProgress({progressOpen: false})
        }, 2000);
    }
    return (
        <div className={"docs_content section__division--vertical bg_gray"}>
            <h2>CommonLUXComponent 예시</h2>
            <button onClick={() => setSnackbar({
                snackbarOpen: true,
                snackbarMessage: '메시지입니다.',
                snackbarType: 'error'
            })}>스낵바 오픈
            </button>
            &emsp;
            <button onClick={() => handleProgressTimeout()}>프로그레스바 오픈</button>
        </div>
    )
}

export default CommonLUXComponentTest;