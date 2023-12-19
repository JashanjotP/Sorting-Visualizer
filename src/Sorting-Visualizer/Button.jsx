import './SortingVisualizer.css';

const Button = (props) =>{
    return ( 
      <button onClick={props.onClick} className="btn"><span className="text">{props.children}</span></button>
    );
}
 
export default Button;