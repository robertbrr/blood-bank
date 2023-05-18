import '../styles.css'
import { useParams } from 'react-router-dom';
import BloodReportListing from '../BloodReportElements/BloodReportListing';

const BloodReportListingDonor = () => {
  const { id } = useParams();
  return BloodReportListing(id);
}

export default BloodReportListingDonor;