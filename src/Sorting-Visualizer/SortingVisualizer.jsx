import React from "react";
import './SortingVisualizer.css';
import {mergeSort, bubbleSort, quickSort, heapSort, insertion, selection} from '../Sorting-Algorithms/algorithms';
import Button from "./Button";


export default class SortingVisualizer extends React.Component{


    constructor(props){
        super(props);

        this.state ={
            array: [],
            bars: 150
        };
    }

    resetArray() {
        const array =[];

        for(let i=0; i< this.state.bars; i++){
            array.push(randomIntFromInterval(5, 550));
        }

        this.setState({array});
        
    }

    componentDidMount(){
        this.resetArray();
    }

    

    mergeSort() {
      const bars = document.getElementsByClassName('array-bar');
      mergeSort(bars,0,this.state.array.length-1);
      }

      
    quickSort(){
      const bars = document.getElementsByClassName('array-bar');
      quickSort(bars,0,this.state.array.length-1);
    }
      

    heapSort(){
      const bars = document.getElementsByClassName('array-bar');
      heapSort(bars);
    }   

    bubbleSort(){
      const bars = document.getElementsByClassName('array-bar');
      bubbleSort(bars);
    }

    insertionSort(){
        const bars = document.getElementsByClassName('array-bar');
        insertion(bars);
    }

    selectionSort(){
        const bars = document.getElementsByClassName('array-bar');
        selection(bars);
    }

   

    render(){
        const {array} = this.state;

        return(
            <div className="container">
                <div className="header">Sorting Visualizer</div>
                <div className="main-container">
                    <div className="bars">
                        {array.map((value,idx) => (
                            <div className="array-bar" key={idx} style ={{height: `${value}px`}}/>
                        ))}
                    </div>
                    <div className="button-container">
                        <input className="slider" type="range" min={75} max={400} defaultValue={150} onChange={(e) => this.change(e)}/>
                        <Button onClick={() => this.resetArray()}>New</Button>
                        <div className="line-container">
                            <div className="line"></div><span className="Title">Algorithms</span><div className="line"></div>
                        </div>
                        <div className="sorts">
                            <Button onClick={() => this.mergeSort()}>Merge</Button>
                            <Button onClick={() => this.bubbleSort()}>Bubble</Button>
                            <Button onClick={() => this.quickSort()}>Quick</Button>
                            <Button onClick={() => this.heapSort()}>Heap</Button>
                            <Button onClick={() => this.insertionSort()}>Insertion</Button>
                            <Button onClick={() => this.selectionSort()}>Selection</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    change(e){
        const newValue = parseInt(e.target.value, 10);
        this.state.bars = newValue;
        
        this.resetArray();
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}