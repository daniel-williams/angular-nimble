import { Action, StudiesActions } from '../store';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


const mockService = {
  fetchSudies: (args: any) => {
    return ['study one', 'study two'];
  },
}

function* fetchStudies(action: Action) {
  try {
    const studies = yield call(mockService.fetchSudies, 'some arg');

    yield put({
      type: StudiesActions.FETCHING_STUDIES_SUCCESS,
      payload: studies
    });
  } catch (err) {
    yield put({
      type: StudiesActions.FETCHING_STUDIES_FAILED,
      payload: err
    });
  }
}

/*
  Allows concurrent fetches
*/
export const studySagas = function* studySagas() {
  yield takeEvery(StudiesActions.FETCHING_STUDIES, fetchStudies);
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches.
*/
// function* mySaga() {
//  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }
