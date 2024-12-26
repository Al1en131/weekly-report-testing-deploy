import { driver } from "driver.js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import useStartAddKpi from "./useStartAddKpi";
import useKPI from "./useKPI";

function driverHead(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver",
        popover: {
          title: "Welcome to Your Dashboard",
          description: "You can access all menus from the sidebar.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver",
        popover: {
          title: "See Your Today Status",
          description:
            "You can see whether you have submitted a report or not today.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#third-driver",
        popover: {
          title: "See Your Completion Rate",
          description:
            "You can see how many percent is your weekly report completion.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth2-driver",
        popover: {
          title: "See Your Staff Report Completion",
          description:
            "Here you can see which of your staff that have and have not filled out today’s report.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver",
        popover: {
          title: "See All Your Submitted Reports",
          description:
            "You can access all your submitted reports and choose from month and week periods.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fifth-driver",
        popover: {
          title: "See Your Performance Grade",
          description:
            "Every month, you will get a performance grade, it will show up here when available.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#sixth-driver",
        popover: {
          title: "See Your Performance Feedback",
          description:
            "Every month, you will get a performance feedback, it will show up here when available.",
          side: "left",
          align: "center",
          onNextClick: () => {
            router.push("/head/weekly-report");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#seventh-driver",
        popover: {
          title: "Click Here to Add a Report",
          description: "Access the Weekly Report menu from the sidebar.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/head");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#eigth-driver",
        popover: {
          title: "Write Your Report Here",
          description:
            "You can also add a media. After submitting, you can edit or delete your report as long as it is on the same day.",
          side: "bottom",
          align: "center",
          onNextClick: () => {
            router.push("/head/my-staff-report");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#nine-driver",
        popover: {
          title: "Click Here to See All Staff Reports",
          description: "You can access all your staff reports from this menu.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/head/weekly-report");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#ten-driver",
        popover: {
          title: "Choose Your Staff to See Their Report",
          description:
            "You can see all your staff reports and filter based on month and week.",
          side: "right",
          align: "center",
          onNextClick: () => {
            router.push("/head/feedback/add/july");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#eleven-driver",
        popover: {
          title: "Click Here to Add Feedback",
          description:
            "You can add monthly feedback for your staff by accessing this menu.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/head/my-staff-report");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#twelve-driver",
        popover: {
          title: "Choose Staff and Write Your Feedback",
          description:
            "Please note that you can’t edit your feedback after it is submitted.",
          side: "right",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}
function driverCoHead(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver",
        popover: {
          title: "Welcome to Your Dashboard",
          description: "You can access all menus from the sidebar.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver",
        popover: {
          title: "See Your Today Status",
          description:
            "You can see whether you have submitted a report or not today.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#third-driver",
        popover: {
          title: "See Your Completion Rate",
          description:
            "You can see how many percent is your weekly report completion.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth2-driver",
        popover: {
          title: "See Your Staff Report Completion",
          description:
            "Here you can see which of your staff that have and have not filled out today’s report.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver",
        popover: {
          title: "See All Your Submitted Reports",
          description:
            "You can access all your submitted reports and choose from month and week periods.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fifth-driver",
        popover: {
          title: "See Your Performance Grade",
          description:
            "Every month, you will get a performance grade, it will show up here when available.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#sixth-driver",
        popover: {
          title: "See Your Performance Feedback",
          description:
            "Every month, you will get a performance feedback, it will show up here when available.",
          side: "left",
          align: "center",
          onNextClick: () => {
            router.push("/co-head/weekly-report");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#seventh-driver",
        popover: {
          title: "Click Here to Add a Report",
          description: "Access the Weekly Report menu from the sidebar.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/co-head");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#eigth-driver",
        popover: {
          title: "Write Your Report Here",
          description:
            "You can also add a media. After submitting, you can edit or delete your report as long as it is on the same day.",
          side: "bottom",
          align: "center",
          onNextClick: () => {
            router.push("/co-head/my-staff-report");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#nine-driver",
        popover: {
          title: "Click Here to See All Staff Reports",
          description: "You can access all your staff reports from this menu.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/co-head/weekly-report");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#ten-driver",
        popover: {
          title: "Choose Your Staff to See Their Report",
          description:
            "You can see all your staff reports and filter based on month and week.",
          side: "right",
          align: "center",
          onNextClick: () => {
            router.push("/co-head/feedback/add/july");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#eleven-driver",
        popover: {
          title: "Click Here to Add Feedback",
          description:
            "You can add monthly feedback for your staff by accessing this menu.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/co-head/my-staff-report");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#twelve-driver",
        popover: {
          title: "Choose Staff and Write Your Feedback",
          description:
            "Please note that you can’t edit your feedback after it is submitted.",
          side: "right",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}

function driverStaff(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver",
        popover: {
          title: "Welcome to Your Dashboard",
          description: "You can access all menus from the sidebar.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver",
        popover: {
          title: "See Your Today Status",
          description:
            "You can see whether you have submitted a report or not today.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#third-driver",
        popover: {
          title: "See Your Completion Rate",
          description:
            "You can see how many percent is your weekly report completion.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver",
        popover: {
          title: "See All Your Submitted Reports",
          description:
            "You can access all your submitted reports and choose from month and week periods.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fifth-driver",
        popover: {
          title: "See Your Performance Grade",
          description:
            "Every month, you will get a performance grade, it will show up here when available.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#sixth-driver",
        popover: {
          title: "See Your Performance Feedback",
          description:
            "Every month, you will get a performance feedback, it will show up here when available.",
          side: "left",
          align: "center",
          onNextClick: () => {
            router.push("/staff/weekly-report");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#seventh-driver",
        popover: {
          title: "Click Here to Add a Report",
          description: "Access the Weekly Report menu from the sidebar.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/staff");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#eigth-driver",
        popover: {
          title: "Write Your Report Here",
          description:
            "You can also add a media. After submitting, you can edit or delete your report as long as it is on the same day.",
          side: "bottom",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}

function driverCLevel(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver",
        popover: {
          title: "Welcome to Your Dashboard",
          description: "You can access all menus from the sidebar.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver",
        popover: {
          title: "See Your Staff Report Completion",
          description:
            "Here you can see which of your staff that have and have not filled out today’s report.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#third-driver",
        popover: {
          title: "See Your Division and Staff Data",
          description:
            "Here you can see the total number of divisions and staff under your supervision.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver",
        popover: {
          title: "See All Your Staff Reports",
          description:
            "You can see all your staff reports and filter based on division, month, and week.",
          side: "right",
          align: "center",
          onNextClick: () => {
            router.push("/c-level/feedback/add/july");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#fifth-driver",
        popover: {
          title: "Click Here to Add Feedback",
          description:
            "You can add monthly feedback for your staff by accessing this menu.",
          side: "right",
          align: "center",
          onPrevClick: () => {
            router.push("/c-level");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#sixth-driver",
        popover: {
          title: "Choose Staff and Write Your Feedback",
          description:
            "Please note that you can’t edit your feedback after it is submitted.",
          side: "bottom",
          align: "center",
          onNextClick: () => {
            router.push("/c-level/feedback/july");
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#seventh-driver",
        popover: {
          title: "Click Here to See All Feedback",
          description:
            "You can see all the monthly feedback given to your staff by accessing this menu.",
          side: "right",
          align: "center",

          onPrevClick: () => {
            router.push("/c-level/feedback/add/july");
            setTimeout(function () {
              driverObj.movePrevious();
            }, 100);
          },
        },
      },
      {
        element: "#ten-driver",
        popover: {
          title: "Choose Your Staff to See The Feedback",
          description:
            "You can see all the feedback and filter based on division, month, and week.",
          side: "right",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}
function driverStaffKPIHead(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver-staff-kpi",
        popover: {
          title: "Welcome to the Staff  KPI Page",
          description: "Here you can assess your staff’s monthly KPI.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver-staff-kpi",
        popover: {
          title: "Use This Table to Assess KPI",
          description:
            "Your main workspace to assess KPI is using the table right here.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#third-driver-staff-kpi",
        popover: {
          title: "Choose Staff you want to assess",
          description: "Click here to choose staff under your supervision.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver-staff-kpi",
        popover: {
          title: "Key Aspects to Assess KPI",
          description:
            "The KPI aspects to focus on when evaluating staff performance.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fifth-driver-staff-kpi",
        popover: {
          title: "Here is your Assess Staff KPI",
          description: "All your staff KPI for the month shown right here.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#sixth-driver-staff-kpi",
        popover: {
          title: "Weight of each KPI",
          description:
            "Made based on the severity or a work program, when added, must be in total of 100.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#seventh-driver-staff-kpi",
        popover: {
          title: "The Current Month's KPI Target",
          description:
            "These are the targets that have been set for each of the KPI.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#eigth-driver-staff-kpi",
        popover: {
          title: "Assess you realization here",
          description:
            "How is your staff progress? Are they achieved the target? Assess their end-month progress here.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#ninth-driver-staff-kpi",
        popover: {
          title: "Click to Fill Your Staff Realization",
          description:
            "How is your staff's progress? Have your staff reach their targets? Input your staff end-of-month realization on this row.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#tenth-driver-staff-kpi",
        popover: {
          title: "See Score and Final Score Here",
          description:
            "When you assess a KPI, its score is automatically calculated.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#eleventh-driver-staff-kpi",
        popover: {
          title: "See Total Aspect",
          description:
            "Each aspect can have more than one KPI, you can see the total aspect summed from the total weight of each KPI.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#twelvth-driver-staff-kpi",
        popover: {
          title: "Check Out Your Staff Value Conversion",
          description:
            "In this row, you can see the conversion of the value from the calculation you entered.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#thirteenth-driver-staff-kpi",
        popover: {
          title: "Click Submit When Finished",
          description:
            "Please note that you can’t change your assessment after submitting it.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#fourteenth-driver-staff-kpi",
        popover: {
          title: "Check Here for More Detailed Explanation",
          description:
            "From definition to calculation formula, and measured rates.",
          side: "top",
          align: "center",
        },
      },
      {
        element: "#fifteenth-driver-staff-kpi",
        popover: {
          title: "Click Here to Show Tutorial Again",
          description:
            "Missing something? You can reshow this guide by clicking here.",
          side: "left",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}
function driverAddDivisionKPIHead(
  router: AppRouterInstance,
  setIsActive: (v: boolean) => any,
  kpi: any[],
  setKpi: (fn: (prev: any[]) => any[]) => any
) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",
    onDestroyed: () => {
      setIsActive(false);
    },
    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver-division-head-kpi",

        popover: {
          title: "Welcome to the Add Division  KPI Page",
          description: "Here you can add your division’s monthly KPI.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver-division-head-kpi",
        popover: {
          title: "Use This Table to Add KPI",
          description:
            "Your main workspace to add KPI is using the table right here.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#third-driver-division-head-kpi",
        popover: {
          title: "Here is Your Division KPI",
          description:
            "All your division KPIs for the month can be added from here.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fourth-driver-division-head-kpi",
        popover: {
          title: "Weight of each KPI",
          description:
            "Made based on the severity or a work program, when added, must be in total of 100.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#fifth-driver-division-head-kpi",
        popover: {
          title: "The Current Month's KPI Target",
          description:
            "Add the targets that have been set for each of the KPI here.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#sixth-driver-division-head-kpi",
        popover: {
          title: "Weight of each KPI",
          description:
            "Made based on the severity or a work program, when added, must be in total of 100.",
          side: "right",
          align: "center",
          onNextClick: (e) => {
            if (kpi.length > 0) {
              setIsActive(false);
            } else {
              setIsActive(false);
              setKpi((prev) => {
                return [{ kpi: "", weight: "", target: "" }];
              });
            }
            setTimeout(function () {
              driverObj.moveNext();
            }, 100);
          },
        },
      },
      {
        element: "#seventh-driver-division-head-kpi",
        popover: {
          title: "Click Here to Delete Row",
          description: "You can remove a row by clicking on the action button.",
          side: "left",
          align: "center",
          onPrevClick: () => {
            if (kpi.length > 0) {
              setIsActive(true);
            } else {
              setIsActive(true);
            }
            driverObj.movePrevious();
          },
        },
      },
      {
        element: "#eigth-driver-division-head-kpi",
        popover: {
          title: "Click Confirm When Finished",
          description:
            "Please note that you can’t change your Division KPI after confirming it.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#ninth-driver-division-head-kpi",
        popover: {
          title: "Check Here for More Detailed Explanation",
          description: "Learn more about the detailed explanation here.",
          side: "top",
          align: "center",
        },
      },
      {
        element: "#tenth-driver-division-head-kpi",
        popover: {
          title: "Click Here to Show Tutorial Again",
          description:
            "Missing something? You can reshow this guide by clicking here.",
          side: "left",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}

function driverAddDivisionKPIClevel(router: AppRouterInstance) {
  const driverObj = driver({
    showProgress: true, // Because everyone loves progress bars!
    nextBtnText: "Next",
    prevBtnText: "Prev",

    doneBtnText: "Finish",
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#first-driver-division-clevel-kpi",
        popover: {
          title: "Welcome to the Division KPI Page",
          description: "Here you can assess your division's monthly KPI.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#second-driver-division-clevel-kpi",
        popover: {
          title: "Use This Table to Assess KPI",
          description:
            "Your main workspace to assess KPI is using the table right here.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#third-driver-division-clevel-kpi",
        popover: {
          title: "Choose the Division You Want to Assess",
          description:
            "Click here to choose a division under your supervision.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#fourth-driver-division-clevel-kpi",
        popover: {
          title: "Here is Your Division KPI",
          description:
            "All your division KPIs for the month are shown right here.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#fifth-driver-division-clevel-kpi",
        popover: {
          title: "Weight of Each KPI",
          description:
            "Made based on the severity of a work program, when added, it must be 100.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#sixth-driver-division-clevel-kpi",
        popover: {
          title: "The Current Month's KPI Target",
          description:
            "These are the targets that have been set for each of the work programs.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#seventh-driver-division-clevel-kpi",
        popover: {
          title: "Assess Your Realization Here",
          description:
            "How is your division progressing? Have they achieved the target? Assess their end-month progress here.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#seventh-driver-division-clevel-kpi",
        popover: {
          title: "Click to Fill Your Realization",
          description:
            "Add your realization here, and make sure not to exceed the set target.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#ninth-driver-division-clevel-kpi",
        popover: {
          title: "See Score and Final Score Here",
          description:
            "When you assess a KPI, its score is automatically calculated.",
          side: "left",
          align: "center",
        },
      },
      {
        element: "#tenth-driver-division-clevel-kpi",
        popover: {
          title: "Click Submit When Finished",
          description:
            "Please note that you can’t change your assessment after submitting it.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#eleventh-driver-division-clevel-kpi",
        popover: {
          title: "Check Here for More Detailed Explanation",
          description:
            "From definition to calculation formula, and measured rates.",
          side: "top",
          align: "center",
        },
      },
      {
        element: "#twelvth-driver-division-clevel-kpi",
        popover: {
          title: "Click Here to Show Tutorial Again",
          description:
            "Missing something? You can reshow this guide by clicking here.",
          side: "left",
          align: "center",
        },
      },
    ],
  });

  return { driverObj };
}

export default function useDriver({ root }: { root: string }) {
  const router = useRouter();
  const { setIsActive } = useStartAddKpi();
  const { kpi, setKpi } = useKPI();
  switch (root) {
    case "/head":
      return driverHead(router);
    case "/co-head":
      return driverCoHead(router);
    case "/staff":
      return driverStaff(router);
    case "/c-level":
      return driverCLevel(router);
    case "/head/staff-kpi":
      return driverStaffKPIHead(router);
    case "/head/division-kpi/add":
      return driverAddDivisionKPIHead(router, setIsActive, kpi, setKpi);

    case "/c-level/division-kpi/add":
      return driverAddDivisionKPIClevel(router);
    default:
      return driverHead(router);
  }
}
