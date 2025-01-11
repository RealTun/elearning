from googleapiclient.discovery import build
import pandas as pd

# Thông tin API
API_KEY = 'AIzaSyDZVD55yhWz1deJUFYpPL6KEiqEsvuAJGI'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

# Hàm lấy video từ playlist
def get_videos_from_playlist(youtube, playlist_id, subject_name):
    videos = []
    next_page_token = None

    while True:
        response = youtube.playlistItems().list(
            part="snippet",
            playlistId=playlist_id,
            maxResults=50,
            pageToken=next_page_token
        ).execute()

        for item in response['items']:
            video_id = item['snippet']['resourceId']['videoId']
            video_title = item['snippet']['title']
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            embed_code = f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

            videos.append({
                'title': video_title,
                'url': video_url,
                'playlist_title': subject_name,  # Gán tên môn học vào cột playlist_title
                'embed_code': embed_code
            })

        # Kiểm tra token trang tiếp theo
        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break

    return videos

# Hàm đọc file TXT chứa playlist IDs và tên môn học
def read_playlist_ids(file_path):
    playlists = []
    with open(file_path, 'r', encoding='utf-8') as file:  # Thêm encoding='utf-8'
        for line in file.readlines():
            if line.strip():
                playlist_id, subject_name = line.strip().split(',', 1)
                playlists.append({'id': playlist_id, 'subject': subject_name.strip()})
    return playlists

# Hàm lưu dữ liệu vào file CSV
def save_to_csv(data, filename='youtube_data1.csv'):
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False, encoding='utf-8')
    print(f"Dữ liệu đã được lưu vào file {filename}")

# Main program
if __name__ == '__main__':
    playlist_file = 'playlist.txt'  # File chứa danh sách playlist IDs và tên môn học
    playlists = read_playlist_ids(playlist_file)
    all_videos = []

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

    for playlist in playlists:
        playlist_id = playlist['id']
        subject_name = playlist['subject']
        print(f"Đang lấy dữ liệu từ playlist {playlist_id} - {subject_name}...")
        videos = get_videos_from_playlist(youtube, playlist_id, subject_name)
        all_videos.extend(videos)

    save_to_csv(all_videos)
