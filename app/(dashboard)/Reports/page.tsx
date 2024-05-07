import BoyStatistics from "@/app/components/graphs/patient-length-age-boys";
import GirlStatistics from "@/app/components/graphs/patient-length-age-girls";

export default function Reports() {
  return (
    <>
      <div>
        <BoyStatistics />
      </div>
      <div>
        <GirlStatistics />
      </div>
    </>
  );
}
