import { Dashboard, Logout, OrderDetails, TaskAdd, Time, ToolBox } from '@carbon/icons-react';

export const LogOutIconCustom = ({ style }) => {
    return (
        <Logout style={ { fill: 'red', width: '20px', height: '18px', ...style } }></Logout>
    );
};

export const DashboardIconCustom = ({ style }) => {
    return (
        <Dashboard style={ { fill: 'black', width: '20px', height: '18px', ...style } }></Dashboard>
    );
};

export const OrderDetailsIconCustom = ({ style }) => {
    return (
        <OrderDetails style={ { fill: 'black', width: '20px', height: '18px', ...style } }></OrderDetails>
    );
};

export const TaskAddIconCustom = ({ style }) => {
    return (
        <TaskAdd style={ { fill: 'black', width: '20px', height: '18px', ...style } }></TaskAdd>
    );
};

export const TimeIconCustom = ({ style }) => {
    return (
        <Time style={ { fill: 'black', width: '20px', height: '18px', ...style } }></Time>
    );
};

export const ToolBoxCustom = ({ style }) => {
    return (
        <ToolBox style={ { fill: 'black', width: '20px', height: '18px', ...style } }></ToolBox>
    );
};
