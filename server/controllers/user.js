import { UserModel } from "../model/userModel.js";

export const searchUsers = async (req,res) => {
  
  try {
    const { searchParm } = req.query
    
    const searchResult = await UserModel.find({ userName: { $regex: `^${searchParm}`, $options: 'i' } });
    const users = searchResult.map(
      (friend) => {
        const stripedFriend = {
          userName: friend.userName,
          firstName: friend.firstName,
          lastName: friend.lastName,
          picturePath: friend.picturePath
        }

        return stripedFriend
      }
    )
    return res.json(users); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

}

export const getFriends = async (req,res) => {

  try {
    const user = await UserModel.findById(req.verifiedUser);

    const friends = user.friends.map(
      async (friendName) => {
        const friend = await UserModel.findOne({userName: friendName})
  
        if (!friend) return null
  
        return {
          firstName: friend.firstName,
          lastName: friend.lastName,
          userName: friend.userName,
          picturePath: friend.picturePath
        }
      }
    )

    res.status(200).json(friends)
  
  } catch (error) {
    console.log(error);
    res.status(500).json({"error": error})
  }


} 

export const requestFriend = async (req, res) => {
  try {
    const user = await UserModel.findById(req.verifiedUser);

    const friendName = req.body.friendName;

    const friend = await UserModel.findOne({ userName: friendName });

    if (!friend){ 
      res.status(403).json({ Msg: "friend not found" })
      return
      };

    if (
      user.friends.includes(friendName) &&
      friend.friends.includes(user.userName)
    ) {
        res.status(201).json(user);
        return
    }

    if (
      friend.friendRequests.includes(user.userName) ||
      user.sentRequests.includes(friendName)
    ) {
      let index = friend.friendRequests.indexOf(user.userName);
      friend.friendRequests.splice(index, 1);

      index = user.sentRequests.indexOf(friendName);
      user.sentRequests.splice(index, 1);
    } else {
      friend.friendRequests.push(user.userName);
      user.sentRequests.push(friendName);
    }

    const _savedfriend = await friend.save();
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const addFriend = async (req, res) => {
  try {
    const user = await UserModel.findById(req.verifiedUser);
    const friendName = req.body.friendName;

    const friend = await UserModel.findOne({ userName: friendName });

    if (!friend) return res.status(403).json({ Msg: "friend not found" });

    if (
      friend.sentRequests.includes(user.userName) &&
      user.friendRequests.includes(friendName)
    ) {
      let index = friend.sentRequests.indexOf(user.userName);
      friend.sentRequests.splice(index, 1);

      index = user.friendRequests.indexOf(friendName);
      user.friendRequests.splice(index, 1);
      user.friends.push(friendName);
      friend.friends.push(user.userName);
      const _savedfriend = await friend.save();
      const savedUser = await user.save();
      return res.status(200).json(savedUser);
    } else if (
      user.friends.includes(friendName) &&
      friend.friends.includes(user.userName)
    ) {
      let index = friend.friends.indexOf(user.userName);
      friend.friends.splice(index, 1);

      index = user.friends.indexOf(friendName);
      user.friends.splice(index, 1);

      const _savedfriend = await friend.save();
      const savedUser = await user.save();
      return res.status(200).json(savedUser);
    }
    res.status(400).json({ msg: "undefined request" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

