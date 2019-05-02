import ExportUsers from './src/ExportUsers'
import CopyUsers from './src/CopyUsers'

const userBackup = async () => {
  const userList = await new ExportUsers().export()
  new CopyUsers(userList).copy()
}

userBackup()
