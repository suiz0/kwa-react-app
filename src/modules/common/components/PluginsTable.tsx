import React from 'react';
import { DataTable  } from 'carbon-components-react';
import {withTranslation, WithTranslation} from 'react-i18next';
import ProfileActions from '../../../store/actions/profile.actions'


const { Table, TableContainer, TableHead, TableRow, TableHeader, TableBody, TableCell } = DataTable;
  
  // We would have a headers array like the following
  

class PluginsTable extends React.Component<WithTranslation & any> {

    constructor(props)
    {
        super(props);
        console.log('UI plugins props',props);
       
    }

    componentDidMount() {
            this.props.dispatch(ProfileActions.getUIplugins(this.props.resources["aperture"]));
            this.props.dispatch(ProfileActions.stopLoading);
      }

    
    render()   
    {
        return (
            <div>
                {
            <DataTable isSortable
            rows={this.props.profile.rows}
            headers={this.props.profile.headers}
            render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title="UI Plugins">
              <Table size='normal'>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {this.props.t(header.header)}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)}
            />
   }
   </div>
        )
    }
}

export default withTranslation()(PluginsTable);