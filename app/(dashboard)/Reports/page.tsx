import BoyBmiStatistics0to2 from "@/app/components/graphs/patient-bmi-age-boys0to2";
import BoyBmiStatistics2to5 from "@/app/components/graphs/patient-bmi-age-boys2to5";
import GirlBmiStatistics0t02 from "@/app/components/graphs/patient-bmi-age-girls0to2";
import GirlBmiStatistics2to5 from "@/app/components/graphs/patient-bmi-age-girls2to5";
import GirlBmiStatistics from "@/app/components/graphs/patient-bmi-age-girls2to5";
import BoyStatistics0t02 from "@/app/components/graphs/patient-length-age-boys-0t02";
import BoyStatistics2to5 from "@/app/components/graphs/patient-length-age-boys-2to5";
import GirlStatistics0to2 from "@/app/components/graphs/patient-length-age-girls-0to2";
import GirlStatistics2to5 from "@/app/components/graphs/patient-length-age-girls-2to5";
import BoyWeightStatistics from "@/app/components/graphs/patient-weight-age-boys";
import GirlWeightStatistics from "@/app/components/graphs/patient-weight-age-girls";

export default function Reports() {
  return (
    <>
      <BoyStatistics0t02 />
      <BoyStatistics2to5 />
      <GirlStatistics0to2 />
      <GirlStatistics2to5 />
      <BoyWeightStatistics />
      <GirlWeightStatistics />
      <BoyBmiStatistics0to2 />
      <BoyBmiStatistics2to5 />
      <GirlBmiStatistics0t02 />
      <GirlBmiStatistics2to5 />
    </>
  );
}
