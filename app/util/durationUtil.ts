import { TimePeriod, TimePeriodDeliveryOrder, TimePeriodOverview } from '../const/timePeriods';

export default class DurationUtil {

    static getDuration (duration: TimePeriod) {
        const today = new Date();
        switch (duration) {
            case TimePeriod.MONTH_A_GO: 
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                return oneMonthAgo;
            case TimePeriod.THREE_MONTH_A_GO:
                const threeMonthAgo = new Date();
                threeMonthAgo.setMonth(today.getMonth() - 3);
                return threeMonthAgo;
            case TimePeriod.SIX_MONTH_A_GO:
                const sixMonthAgo = new Date();
                sixMonthAgo.setMonth(today.getMonth() - 6);
                return sixMonthAgo;
            case TimePeriod.YEAR_A_GO:
                const yearAgo = new Date();
                yearAgo.setMonth(today.getMonth() - 12);
                return yearAgo;
            case TimePeriod.THIRTY_DAYS_A_GO:
                const currentDate = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(currentDate.getDate() - 30);
                return thirtyDaysAgo;
            default:
                const yearAgoDefault = new Date();
                yearAgoDefault.setMonth(today.getMonth() - 12);
                return yearAgoDefault;
        }
    }

    static getDurationOverview (duration: TimePeriodOverview) {
        const today = new Date();
        switch (duration) {
            case TimePeriodOverview.CURRENT_MONTH: 
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
                return startOfMonth;
            case TimePeriodOverview.LAST_NINETY_DAYS:
                const currentDate = new Date();
                const ninetyDaysAgo = new Date();
                ninetyDaysAgo.setDate(currentDate.getDate() - 90);
                return ninetyDaysAgo;
            default:
                const startOfMonthDefault = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
                return startOfMonthDefault;
        }
    }

    static getDurationDeliveryOrders (duration: TimePeriodDeliveryOrder) {
        switch (duration) {
            case TimePeriodDeliveryOrder.LAST_THIRTY_DAYS:
            default:
                const currentDate = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(currentDate.getDate() - 30);
                return thirtyDaysAgo;
        }
    }

    static getPeriodType (duration: number) {
        switch (duration) {
            case 1:
                return TimePeriod.MONTH_A_GO;
            case 2:
                return TimePeriod.THREE_MONTH_A_GO;
            case 3:
                return TimePeriod.SIX_MONTH_A_GO;
            case 4:
                return TimePeriod.YEAR_A_GO;
            case 5:
                return TimePeriod.THIRTY_DAYS_A_GO;
            default:
                return TimePeriod.YEAR_A_GO;
        }
    }

    static getStartDateLastMonth = () => {
        const today = new Date();
        const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonth = new Date(firstDayThisMonth);
        lastMonth.setMonth(firstDayThisMonth.getMonth() - 1);
        return lastMonth;
    }

    static getEndDateLastMonth = () => {
        const today = new Date();
        const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonth = new Date(firstDayThisMonth);
        lastMonth.setMonth(firstDayThisMonth.getMonth() - 1);
        const lastDayLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        return lastDayLastMonth;
    };

}

