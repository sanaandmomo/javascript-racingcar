import RacingCars from './RacingCars.js';
import Render from './Render.js';
import UserInput from './UserInput.js';
import { haveMiddleBlank, exceedMaxLength, isPositive, haveEmpty } from './validation.js';
import { $ } from './util.js';

export default class RacingGame {
    constructor() {
        this.racingCars = new RacingCars();
        this.setEvent();
        this.initTryCntEvent();
        this.setRestartEvent();
    }

    setEvent() {
        $('#car-name-submit-button').addEventListener('click', () => {
            const carNames = UserInput.getCarNames();
            if (haveEmpty(carNames)) return alert('자동차 이름을 입력해주세요.');
            if (haveMiddleBlank(carNames)) return alert('자동차 이름에 공백이 들어갈 수 없습니다.');
            if (exceedMaxLength(carNames)) return alert('자동차 이름은 5자 이하입니다.');

            this.racingCars.reset();
            this.racingCars.update(carNames);
            Render.showTryForm();
        });
    }

    initTryCntEvent() {
        $('#try-count-submit-button').addEventListener('click', () => {
            const tryCnt = UserInput.getTryCnt();
            if (!Number.isInteger(tryCnt)) return alert('자연수를 입력해주세요.');
            if (!isPositive(tryCnt)) return alert('양수를 입력해주세요.');

            this.runGame(tryCnt);
            this.racingCars.resetSteps();
        });
    }

    setRestartEvent() {
        $('#restart-button').addEventListener('click', () => {
            this.racingCars.reset();
            Render.reset();
            UserInput.reset();
        });
    }

    runGame(tryCnt) {
        this.racingCars.run(tryCnt);
        Render.showResult(this.racingCars.getStatus(), this.racingCars.getWinners());
    }
}
