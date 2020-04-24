import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        const now = new Date();
        this.state = {
            marked : [
                { d: '5/1', color: '#ffc400' },
                { d: '12/24', color: '#ffee00' },
                { d: '12/25', color: 'red' },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 4) },
                { d: new Date(now.getFullYear(), now.getMonth() - 2, 13) },
                { d: new Date(now.getFullYear(), now.getMonth(), 2), color: '#46c4f3' },
                { d: new Date(now.getFullYear(), now.getMonth(), 6), color: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth(), 11), color: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth(), 19), color: '#89d7c9' },
                { d: new Date(now.getFullYear(), now.getMonth(), 28), color: '#ea4986' },
                { d: new Date(now.getFullYear(), now.getMonth(), 13), color: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth(), 13), color: '#f13f77' },
                { d: new Date(now.getFullYear(), now.getMonth(), 13), color: '#89d7c9' },
                { d: new Date(now.getFullYear(), now.getMonth(), 13), color: '#8dec7d' },
                { d: new Date(now.getFullYear(), now.getMonth(), 21), color: '#ffc400' },
                { d: new Date(now.getFullYear(), now.getMonth(), 21), color: '#8dec7d' },
                { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), color: '#f4511e' }
            ],
            colors: [
                { d: '12/8', background: '#9ccc65' },
                { d: '5/1', background: 'red' },
                { d: '12/24', background: "#fff568" },
                { d: '12/25', background: "#e88080" },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 4), background: '#cfd8dc' },
                { d: new Date(now.getFullYear(), now.getMonth() + 2, 24), background: '#9575cd' },
                { d: new Date(now.getFullYear(), now.getMonth() - 2, 13), background: '#d4e157' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 6), background: "#f4511e" },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 6), background: '#46c4f3' },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 22), background: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 11), background: '#46c4f3' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 29), background: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth(), 2), background: '#46c4f3' },
                { d: new Date(now.getFullYear(), now.getMonth(), 3), background: '#7e56bd' },
                { d: new Date(now.getFullYear(), now.getMonth(), 11), background: '#f13f77' },
                { d: new Date(now.getFullYear(), now.getMonth(), 19), background: '#8dec7d' },
                { d: new Date(now.getFullYear(), now.getMonth(), 28), background: '#ea4986' },
                { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), text: 'Conference', background: '#f4511e' }
            ],
            labels: [
                { d: '12/25', text: 'Christmas', color: "#f48fb1" },
                { d: '1/1', text: 'New year' },
                { d: '12/1', text: 'Meeting', color: '#ffc400' },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 4), text: 'Spa day', color: '#cfd8dc' },
                { d: new Date(now.getFullYear(), now.getMonth() + 2, 24), text: 'BD Party', color: '#9ccc65' },
                { d: new Date(now.getFullYear(), now.getMonth() - 2, 13), text: 'Exams', color: '#d4e157' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 6), text: 'Trip', color: "#f4511e" },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 6), color: '#46c4f3', text: 'Pizza Night' },
                { d: new Date(now.getFullYear(), now.getMonth() + 1, 22), color: '#7e56bd', text: 'Beerpong' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 11), color: '#46c4f3', text: 'Anniversary' },
                { d: new Date(now.getFullYear(), now.getMonth() - 1, 29), color: '#7e56bd', text: 'Pete BD' },
                { d: new Date(now.getFullYear(), now.getMonth(), 2), color: '#46c4f3', text: 'Ana BD' },
                { d: new Date(now.getFullYear(), now.getMonth(), 3), color: '#7e56bd', text: 'Concert' },
                { d: new Date(now.getFullYear(), now.getMonth(), 11), color: '#f13f77', text: 'Trip' },
                { d: new Date(now.getFullYear(), now.getMonth(), 19), color: '#8dec7d', text: 'Math exam' },
                { d: new Date(now.getFullYear(), now.getMonth(), 28), color: '#ea4986', text: 'Party' },
                { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), text: 'Conference', color: '#f4511e' }
            ]
        };
    }
    
    render() {
        return (
            <mobiscroll.Form>
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.FormGroupTitle>Marked days</mobiscroll.FormGroupTitle>
                                <mobiscroll.Calendar
                                    marked={this.state.marked}
                                    display="inline"
                                    type="hidden"
                                />
                            </mobiscroll.FormGroup>
                        </div>
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.FormGroupTitle>Colored days</mobiscroll.FormGroupTitle>
                                <mobiscroll.Calendar
                                    colors={this.state.colors}
                                    display="inline"
                                    type="hidden"
                                />
                            </mobiscroll.FormGroup>
                        </div>
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.FormGroupTitle>Labels</mobiscroll.FormGroupTitle>
                                <mobiscroll.Calendar
                                    labels={this.state.labels}
                                    display="inline"
                                    type="hidden"
                                />
                            </mobiscroll.FormGroup>
                        </div>
                    </div>
                </div>
            </mobiscroll.Form>
        );
    }   
}
export default Calendar;