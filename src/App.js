import { useState } from "react";
import { Container, Display, ButtonContainer, Button } from "./components";
import { btnValues } from "./btnValues";
import { toLocaleString, removeSpaces } from "./features";

function App() {
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });
    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                        ? toLocaleString(Number(removeSpaces(calc.num + value)))
                        : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".")
                ? calc.num + value
                : calc.num,
        });
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                    ? a - b
                    : sign === "X"
                    ? a * b
                    : a / b;

            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(
                              math(
                                  Number(removeSpaces(calc.res)),
                                  Number(removeSpaces(calc.num)),
                                  calc.sign
                              )
                          ),
                sign: "",
                num: 0,
            });
        }
    };

    const delClickHandler = () => {
        let delNum = removeSpaces(calc.num);
        delNum = delNum.substring(0, delNum.length - 1);
        let delRes = removeSpaces(calc.res);
        delRes = delRes.substring(0, delRes.length - 1);
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(delNum) : 0,
            res: calc.res ? toLocaleString(delRes) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <>
            <div className="title">Calculator Program ReactApp</div>
            <Container>
                <Display value={calc.num ? calc.num : calc.res} />
                <ButtonContainer>
                    {btnValues.flat().map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                className={btn === "=" ? "equals" : ""}
                                value={btn}
                                onClick={
                                    btn === "C"
                                        ? resetClickHandler
                                        : btn === "Del"
                                        ? delClickHandler
                                        : btn === "%"
                                        ? percentClickHandler
                                        : btn === "="
                                        ? equalsClickHandler
                                        : btn === "/" ||
                                          btn === "X" ||
                                          btn === "-" ||
                                          btn === "+"
                                        ? signClickHandler
                                        : btn === "."
                                        ? commaClickHandler
                                        : numClickHandler
                                }
                            />
                        );
                    })}
                </ButtonContainer>
            </Container>
        </>
    );
}

export default App;
