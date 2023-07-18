import create from 'zustand';
import testAPI from "services/apis/test";

const testState = {
    number: 1, name: '홍길동', snackbarMessage: '', snackbarOpen: false,
    snackbarType: 'success', progressOpen: false, progressSize: 200, progressText: 'Loading...'
}

const testStore = create(
    (set, get) => ({
        ...testState,
        getName: async () => {
            const response = await testAPI.getTestName();

            const {
                resultCode, resultData
            } = response;

            if(resultCode === 200) {
                set({name: '김철수'});
            }
        }
        ,
        increaseNumber: () => {
            const {
                number
            } = get();

            set({number: number + 1});
        },
        setSnackbar: (obj) => {
            set(obj);
        },
        setProgress: (obj) => {
            set(obj);
        }
    })
)

export default testStore;