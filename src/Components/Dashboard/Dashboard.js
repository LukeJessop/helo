import React, {Component} from 'react'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            searchTerm: '',
            checkBox: false,
            list: []
        }
    }

    changeHandler(e){
        this.setState({
            searchTerm: e,
        })
    }

    

    render(){ 
        const mappedList = this.state.list.map((listItems) => {
            <div>
                <h2>Title</h2>
                <h2>Author</h2>
                <img>profile picture</img>
            </div>
        })
        return(
            <div>
                <input onChange={e => this.changeHandler(e.target.value)}></input>
                <button>Search</button>
                <button>Reset</button>
                <div>
                    <span>My Posts</span>
                    <input type="checkbox" onChange={() => {
                        if(this.state.checkBox === true){
                            this.setState({checkBox: false})
                        }else{
                            this.setState({checkBox: true})
                        }
                    }}></input>
                    <div>
                        {mappedList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard