import {
    NewDeposit as NewDepositEvent,
    Newbie as NewbieEvent,
    UnStake as UnStakeEvent,
    Withdrawn as WithdrawnEvent,
    FeePayed as FeePayedEvent,
    CommissionClaimed as CommissionClaimedEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    Unpaused as UnpausedEvent,
    UpdateSponsor as UpdateSponsorEvent
} from "../generated/NFTStaking/NFTStaking"
import { NewDeposit, Unstake, Withdrawn, CommissionClaimed, User, UpdateSponsor } from "../generated/schema"
import { BigInt, Value, log } from "@graphprotocol/graph-ts";
import { fetchUserInfo, ZERO_BI } from "./utils";
  
export function handleNewDeposit(event: NewDepositEvent): void {
    log.info("New Deposit Function", [])
    let newDeposit = new NewDeposit(event.transaction.hash.toHex())
    newDeposit.blockNumber = event.block.number
    newDeposit.blockTimestamp = event.block.timestamp
    newDeposit.userAddress = event.params.user
    newDeposit.transactionHash = event.transaction.hash
    newDeposit.amount = event.params.amount
    newDeposit.start = event.params.start
    newDeposit.finish = event.params.finish
    newDeposit.apr = event.params.apr
    newDeposit.fee = event.params.fee
    newDeposit.plan = BigInt.fromI32(event.params.plan)
    newDeposit.poolId = BigInt.fromI32(event.params.poolId)
    let user = User.load(event.params.user)
    if(user === null) {
        user = new User(event.params.user)
    }
    let userInfo = fetchUserInfo(event.address, event.params.user)
    user.address = userInfo.owner
    user.registerTime = userInfo.registerTime
    user.lastStake = userInfo.lastStake
    user.sponsorAddress = userInfo.sponsorAddress
    user.totalCommission = userInfo.totalCommission
    user.totalCurrentStake = userInfo.totalCurrentStake
    user.totalVolume = userInfo.totalVolume
    user.totalSponsoredUsers = userInfo.totalSponsoredUsers
    user.totalF1 = userInfo.totalF1
    user.totalF2 = userInfo.totalF2
    user.totalF3 = userInfo.totalF3
    user.save()
    // let sponsorInfo = fetchUserInfo(event.address, userInfo.sponsorAddress)
    // let sponsor = User.load(sponsorInfo.owner)
    // if(sponsor === null) {
    //     sponsor = new User(sponsorInfo.owner)
    // }
    // sponsor.address = sponsorInfo.owner
    // sponsor.registerTime = sponsorInfo.registerTime
    // sponsor.lastStake = sponsorInfo.lastStake
    // sponsor.sponsorAddress = sponsorInfo.sponsorAddress
    // sponsor.totalCommission = sponsorInfo.totalCommission
    // sponsor.totalCurrentStake = sponsorInfo.totalCurrentStake
    // sponsor.totalVolume = sponsorInfo.totalVolume
    // sponsor.totalSponsoredUsers = sponsorInfo.totalSponsoredUsers
    // sponsor.totalF1 = sponsorInfo.totalF1
    // sponsor.totalF2 = sponsorInfo.totalF2
    // sponsor.totalF3 = sponsorInfo.totalF3
    // sponsor.save()
    newDeposit.user = user.id
    newDeposit.save()
}

export function handleUnStake(event: UnStakeEvent): void {
    let unStake = new Unstake(event.transaction.hash.toHex())
    unStake.blockNumber = event.block.number
    unStake.blockTimestamp = event.block.timestamp
    unStake.transactionHash = event.transaction.hash
    unStake.amount = event.params.amount
    unStake.start = event.params.start
    unStake.userAddress = event.params.user
    unStake.profit = event.params.profit
    unStake.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
    let withdrawn = new Withdrawn(event.transaction.hash.toHex())
    withdrawn.blockNumber = event.block.number
    withdrawn.blockTimestamp = event.block.timestamp
    withdrawn.transactionHash = event.transaction.hash
    withdrawn.userAddress = event.params.user
    withdrawn.start = event.params.start
    withdrawn.profit = event.params.profit
    withdrawn.poolId = event.params.poolId
    withdrawn.plan = event.params.plan
    withdrawn.save()
}

export function handleCommissionClaimed(event: CommissionClaimedEvent): void {
    let cmsClaimed = new CommissionClaimed(event.transaction.hash.toHex())
    cmsClaimed.blockNumber = event.block.number
    cmsClaimed.blockTimestamp = event.block.timestamp
    cmsClaimed.transactionHash = event.transaction.hash
    cmsClaimed.userAddress = event.params.user
    cmsClaimed.amount = event.params.amount
    cmsClaimed.save()
}

export function handleUpdateSponsor(event: UpdateSponsorEvent): void {
    log.info("Update sponsor function", [])
    let updateSponsor = new UpdateSponsor(event.transaction.hash.toHex())
    updateSponsor.userAddress = event.params.user
    updateSponsor.sponsorAddress = event.params.sponsor
    let user = User.load(event.params.user)
    if(user === null) {
        user = new User(event.params.user)
    }
    user.sponsorAddress = event.params.sponsor
    user.address = event.params.user
    let userInfo = fetchUserInfo(event.address, event.params.user)
    user.registerTime = userInfo.registerTime
    user.lastStake = userInfo.lastStake
    user.totalCommission = userInfo.totalCommission
    user.totalCurrentStake = userInfo.totalCurrentStake
    user.totalVolume = userInfo.totalVolume
    user.totalSponsoredUsers = userInfo.totalSponsoredUsers
    user.totalF1 = userInfo.totalF1
    user.totalF2 = userInfo.totalF2
    user.totalF3 = userInfo.totalF3
    user.save()
    updateSponsor.save()
    log.info("Done update user: {}, {}", [updateSponsor.userAddress.toHex(), updateSponsor.sponsorAddress.toHex()])
}

export function handleNewbie(event: NewbieEvent): void {

}

export function handleFeePayed(event: FeePayedEvent): void {

}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {

}

export function handleUnpaused(event: UnpausedEvent): void {

}
  