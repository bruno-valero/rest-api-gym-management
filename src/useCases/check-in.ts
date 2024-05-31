import CheckInsRepository from "@/repositories/check-ins-repository";
import GymsRepository from "@/repositories/gyms-repository";
import getDistanceBetweenCoordinates, { Coordinate } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";
import MaxDistanceError from "./errors/max-distance-error";
import MaxNumberOfCheckInsError from "./errors/max-number-of-check-ins-error";
import ResourceNotFoundError from "./errors/resource-not-found-error";

export interface CheckInUseCaseRequest {
    userId:string,
    gymId:string,
    userLatitude:number,
    userLongitude:number,
}

type CheckInUseCaseResponse = { checkIn: CheckIn }

export default class CheckInUseCase {

    constructor(
        private checkInRepository: CheckInsRepository,
        private gymRepository: GymsRepository,
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }:CheckInUseCaseRequest):Promise<CheckInUseCaseResponse> {

        // console.log('data: ', { userId, gymId, userLatitude, userLongitude })
        
        const gym = await this.gymRepository.findById(gymId)
        
        if (!gym) throw new ResourceNotFoundError()
        
        // console.log('gym: ', gym)
        
        const from:Coordinate = {
            latitude:userLatitude,
            longitude:userLongitude,
        }
        const to:Coordinate = {
            latitude:Number(gym.latitude),
            longitude:Number(gym.longitude),
        }
        const kmDistance = getDistanceBetweenCoordinates(from, to)
        
        console.log(`Log_kmDistance`, kmDistance)
        
        const MAX_DISTANCE_IN_KILOMETERS = 0.1
        
        if (kmDistance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError();
        
        
        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())
        
        console.log(`checkInOnSameDay`, checkInOnSameDay)
        
        if (!!checkInOnSameDay) throw new MaxNumberOfCheckInsError();        

        const checkIn = await this.checkInRepository.create({ user_id:userId, gym_id:gymId })

        return {
            checkIn
        }

    }
}