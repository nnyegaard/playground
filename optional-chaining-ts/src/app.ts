import { oc } from "ts-optchain";

const bla: IBla = {
    id: 1,
    test: {}
};

interface IBla {
    id: number;
    test: {
        id?: number;
    };
}

console.log(oc(bla.test.id)());
