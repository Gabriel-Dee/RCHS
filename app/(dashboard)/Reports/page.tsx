import BoyBmiStatistics from "@/app/components/graphs/patient-bmi-age-boys";
import GirlBmiStatistics from "@/app/components/graphs/patient-bmi-age-girls";
import BoyStatistics from "@/app/components/graphs/patient-length-age-boys";
import GirlStatistics0to2 from "@/app/components/graphs/patient-length-age-girls-0to2";
import GirlStatistics2to5 from "@/app/components/graphs/patient-length-age-girls-2to5";
import BoyWeightStatistics from "@/app/components/graphs/patient-weight-age-boys";
import GirlWeightStatistics from "@/app/components/graphs/patient-weight-age-girls";

export default function Reports() {
  return (
    <>
      <BoyStatistics />
      <GirlStatistics0to2 />
      <GirlStatistics2to5 />
      <BoyWeightStatistics />
      <GirlWeightStatistics />
      <BoyBmiStatistics />
      <GirlBmiStatistics />
    </>
  );
}
