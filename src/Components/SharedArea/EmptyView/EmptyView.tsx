import "./EmptyView.css";

interface EmptyViewProps{
    msg: string;
}

function EmptyView(props:EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
            <h1>{props.msg}</h1>
            <img alt="empty view" src="https://media.giphy.com/media/CoND5j6Bn1QZUgm1xX/giphy.gif"/>
			
        </div>
    );
}

export default EmptyView;
