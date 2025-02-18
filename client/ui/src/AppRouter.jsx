import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './Register';
import MyProfile from './MyProfile';
import ReportForm from './ReportForm';
import FinancialReport from './FinancialReport';
import Sign from './Sign';
import MyForm from './components/MyForm';
import BusCardlist from './components/BusCardlist';
import Update from './components/Update';
import Reservationlist from './components/Reservationlist';
import Navbar from './components/Navbar';
import LastD from './components/LastD';
import EmployeeList from './components/EmployeeList';
import InsertEmployee from './components/InsertEmployee';
import ContactUs from './components/ContactUs';
import Navbar1 from './components/Navbar1';
import Footer from './components/Footer';
import AddReview from './components/AddReview';
import Feedbacklist from './components/Feedbacklist';
import PackageList from './components/PackageList';
import InsertPackage from './components/InsertPackage';
import Navbar2 from './components/Navbar2';
import LuggageList from './components/LuggageList';
import ViewLuggage from './components/ViewLuggage';
import InsertLuggageForm from './components/InsertLuggage';
import Navbar3 from './components/Navbar3';







function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MyProfile/:id" element={<MyProfileWithNav />} />
        <Route path="/Report" element={<ReportFormWithNav />} />
        <Route path="/financial-report" element={<FinancialReportWithNav />} />
        <Route path="/form" element={<MyFormWithNav />} />
        <Route path="/read" element={<ReservationlistWithNav />} />
        <Route path="/buslist" element={<BusCardlistWithNav />} />
        <Route path="/read/updateForm/:id" element={<UpdateWithNav />} />
        <Route path="/luggage" element={<LuggageWithNav />} />
        <Route path="/insert" element={<InsertLuggageWithNav />} />
        <Route path="/luggage/:id" element={<ViewLuggageWithNav />} />
        <Route path="/employees" element={<EmployeeListWithNav />} />
        <Route path="/insertemp" element={<InsertEmployeeWithNav />} />
        <Route path="/contactus" element={<ContactUsWithNav />} />
        <Route path="/AddReview" element={<AddReviewWithNav />} />
        <Route path="/ViewReview" element={<ViewReviewWithNav />} />
        <Route path="/AddPackage" element={<AddPackageWithNav />} />
        <Route path="/ViewPackage" element={<ViewPackageWithNav />} />
      </Routes>
    </Router>
  );
}

function HomeRoutes() {
  return (
    <>
      <Sign />
    </>
  );
}



function ReportFormWithNav() {
  return (
    <>
      <Navbar3/>
      <ReportForm />
      <Footer/>
    </>
  );
}

function MyProfileWithNav() {
  return (
    <>
      <Navbar/>
      <MyProfile />
      <Footer/>
    </>
  );
}

function FinancialReportWithNav() {
  return (
    <>
      <Navbar3/>
      <FinancialReport />
      <Footer/>
    </>
  );
}

function MyFormWithNav() {
  return (
    <>
      <Navbar />
      <MyForm />
      <Footer/>
    </>
  );
}

function ReservationlistWithNav() {
  return (
    <>
      <Navbar />
      <Reservationlist />
      <Footer/>
    </>
  );
}

function BusCardlistWithNav() {
  return (
    <>
      <Navbar />
      <BusCardlist />
      <Footer/>
    </>
  );
}

function UpdateWithNav() {
  return (
    <>
      <Navbar />
      <Update />
      <Footer/>
    </>
  );
}

function InsertLuggageWithNav() {
  return (
    <>
      <Navbar />
      <InsertLuggageForm />
      <Footer/>
    </>
  );
}

function ViewLuggageWithNav() {
  return (
    <>
      <Navbar />
      <ViewLuggage />
      <Footer/>
    </>
  );
}

function LuggageWithNav() {
  return (
    <>
      <Navbar />
      <LuggageList />
      <Footer/>
    </>
  );
}

function EmployeeListWithNav() {
  return (
    <>
      <Navbar1 />
      <EmployeeList />
      <Footer />
    </>
  );
}

function InsertEmployeeWithNav() {
  return (
    <>
      <Navbar1 />
      <InsertEmployee />
      <Footer />
    </>
  );
}

function ContactUsWithNav() {
  return (
    <>
      <Navbar1 />
      <ContactUs />
      <Footer />
    </>
  );
}

function AddReviewWithNav() {
  return (
    <>
      <Navbar />
      <AddReview/>
      <Footer />
    </>
  );
}

function ViewReviewWithNav() {
  return (
    <>
      <Navbar />
      <Feedbacklist/>
      <Footer />
    </>
  );
}

function AddPackageWithNav() {
  return (
    <>
      <Navbar2 />
      <InsertPackage/>
      <Footer />
    </>
  );
}

function ViewPackageWithNav() {
  return (
    <>
      <Navbar2 />
      <PackageList/>
      <Footer />
    </>
  );
}

export default AppRouter;
