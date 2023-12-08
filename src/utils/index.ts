/* eslint-disable prefer-const */
import { Address, BigDecimal, BigInt, ByteArray, Value, log } from "@graphprotocol/graph-ts";
import { NFTStaking as NFTStakingContract, NFTStaking__getUserInfoResultUserInfoStruct } from "../../generated/NFTStaking/NFTStaking";

export let ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
// prettier-ignore

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);

export function fetchUserInfo(stakingContract: Address, userAddress: Address): NFTStaking__getUserInfoResultUserInfoStruct {
  let contract = NFTStakingContract.bind(stakingContract)

  let userInfo = contract.try_getUserInfo(userAddress)

  if(userInfo.reverted) {
    throw new Error("getUserInfo call reverted");
  } 
  return userInfo.value
}
