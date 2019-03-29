import { Query } from "react-apollo";
import { Bank, Branch } from "../config/types";

interface BankData {
  banks: Array<Bank>;
}

interface BranchData {
  branches: Array<Branch>;
}

class BankQuery extends Query<BankData> {}
class BranchQuery extends Query<BranchData> {}

export { BankQuery, BranchQuery };
