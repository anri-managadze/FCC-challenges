import React, {useState} from 'react';
import './calculator.css';


const Calculator = () => {
    const [result,setResult]= useState('');
    const [total,setTotal]=useState(result);

    function display(symbol) {
        setResult((prevValue) => {
            if (
                /[+*-/]/.test(symbol) &&
                /[+*-/]/.test(prevValue[prevValue.length - 1])
            ) {
                let newValue;
                if (/[-]/.test(symbol)) {
                    newValue = prevValue.slice(0, prevValue.length) + symbol;
                } else {
                    let count = 0;
                    for (let i = 0; i < prevValue.length; i++) {
                        if (isNaN(+prevValue[i])) {
                            count++;
                        } else {
                            count = 0;
                        }
                    }
                    newValue = prevValue.slice(0, prevValue.length - count) + symbol;
                }
                setResult(newValue);
            } else {
                if (prevValue) {
                    prevValue = prevValue + "";
                    let valArr = prevValue.split(/[+/*-]/g);
                    console.log("valArr " + JSON.stringify(valArr));
                    let lastNumber = valArr[valArr.length - 1];
                    if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".") {
                        console.log("symbol = empty ");
                        symbol = "";
                    }
                }
                setResult(
                    (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
                );
            }
        });
        setTotal((prevValue) =>
            (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
    }

    function calculate() {
        try {
            setTotal(eval(result));
            setResult(eval(result));
        } catch (err) {
            setTotal('Error')
        }
    }
    function clear() {
        setResult("");
        setTotal(0);
    }
    function back () {
        setResult((prev) => {
            setTotal(0);
            console.log(prev);
            prev = prev + "";
            return prev
                .split("")
                .slice(0, prev.length - 1)
                .join("");
        });
    }

    const minusPlus = () => {
        if (result.charAt(0) === "-") {
            setResult(result.substring(1));
        } else {
            setResult("-" + result);
        }
    };
    return (
        <div className="container">
            <div className="grid">
                <div className="display">
                    <input
                        className="expression"
                        disabled
                        placeholder="0"
                        value={result}
                    />
                    <input
                        id="display"
                        className="answer"
                        disabled
                        value={total}
                    />
                </div>
                <div className='pad'>
                <button onClick={clear} className="clear" id="clear">C</button>
                <button onClick={back} className="operationBtn" id="c">&#8592;</button>
                <button onClick={minusPlus} className="operationBtn" id="-/+">&#177;</button>
                <button onClick={() => display("/")} className="operationBtn" id="divide">&#247;</button>
                <button onClick={() => display("7")} className="numberBtn" id="seven">7</button>
                <button onClick={() => display("8")} className="numberBtn" id="eight">8</button>
                <button onClick={() => display("9")} className="numberBtn" id="nine">9</button>
                <button onClick={() => display("*")} className="operationBtn" id="multiply">&#215;</button>
                <button onClick={() => display("4")} className="numberBtn" id="four">4</button>
                <button onClick={() => display("5")} className="numberBtn" id="five">5</button>
                <button onClick={() => display("6")} className="numberBtn" id="six">6</button>
                <button onClick={() => display("-")} className="operationBtn" id="subtract">&#8722;</button>
                <button onClick={() => display("1")} className="numberBtn" id="one">1</button>
                <button onClick={() => display("2")} className="numberBtn" id="two">2</button>
                <button onClick={() => display("3")} className="numberBtn" id="three">3</button>
                <button onClick={() => display("+")} className="operationBtn" id="add">&#43;</button>
                <button onClick={() => display(".")} className="numberBtn" id="decimal">.</button>
                    <button onClick={() => display("0")} className="numberBtn" id="zero">0</button>
                <button onClick={calculate} className="equal" id="equals">&#61;</button>
            </div>
            </div>
        </div>
    );
};

export default Calculator;