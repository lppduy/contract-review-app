import { ReviewResult } from './ai-review'

export const MOCK_RESULT: ReviewResult = {
  contract_type: 'Hợp đồng lao động có thời hạn',
  summary:
    'Hợp đồng lao động giữa Công ty TNHH Công Nghệ ABC Việt Nam (Bên A) và bà Trần Thị Minh (Bên B) cho vị trí Lập trình viên Backend, thời hạn 12 tháng với mức lương 15 triệu đồng/tháng. Hợp đồng chứa nhiều điều khoản bất lợi nghiêm trọng cho người lao động, vi phạm một số quy định của Bộ luật Lao động 2019.',
  parties: [
    { name: 'Công ty TNHH Công Nghệ ABC Việt Nam', role: 'Bên sử dụng lao động (Bên A)' },
    { name: 'Trần Thị Minh', role: 'Người lao động (Bên B)' },
  ],
  key_terms: [
    { label: 'Chức danh', value: 'Lập trình viên Backend' },
    { label: 'Thời hạn', value: '12 tháng (01/03/2024 – 28/02/2025)' },
    { label: 'Lương cơ bản', value: '15.000.000 VNĐ/tháng' },
    { label: 'Thử việc', value: '60 ngày' },
    { label: 'Giờ làm việc', value: '8h00 – 17h00, Thứ 2 – Thứ 7 (6 ngày/tuần)' },
    { label: 'Nghỉ phép', value: '10 ngày/năm' },
    { label: 'Lương đóng BHXH', value: '6.000.000 VNĐ (thấp hơn lương thực tế)' },
  ],
  risks: [
    {
      level: 'high',
      title: 'Điều khoản không cạnh tranh quá rộng và vô hiệu',
      description:
        'Cấm làm việc trong toàn ngành công nghệ tại Việt Nam trong 24 tháng với mức phạt 500 triệu đồng. Điều khoản này vi phạm quyền tự do lao động theo Điều 35 Hiến pháp 2013 và thường bị tòa án tuyên vô hiệu.',
    },
    {
      level: 'high',
      title: 'Bên A tự ý giảm lương tới 30% mà không cần thỏa thuận',
      description:
        'Vi phạm Điều 35 Bộ luật Lao động 2019 — mọi thay đổi về tiền lương phải có sự thỏa thuận của người lao động và lập thành phụ lục hợp đồng.',
    },
    {
      level: 'high',
      title: 'Đóng BHXH trên mức lương thấp hơn lương thực tế',
      description:
        'Mức đóng BHXH 6 triệu/tháng trong khi lương thực tế 15 triệu là vi phạm Luật BHXH. Người lao động bị thiệt về quyền lợi bảo hiểm và lương hưu sau này.',
    },
    {
      level: 'high',
      title: 'Bất cân xứng trong quyền chấm dứt hợp đồng',
      description:
        'Bên A chỉ cần báo trước 3 ngày, trong khi Bên B phải báo trước 60 ngày và bồi thường 3 tháng lương nếu nghỉ sớm. Thời gian báo trước của Bên A thấp hơn quy định pháp luật (30–45 ngày tùy loại hợp đồng).',
    },
    {
      level: 'medium',
      title: 'Điều chuyển công tác đơn phương không cần đồng ý',
      description:
        'Bên A có quyền điều chuyển sang tỉnh thành khác mà không cần sự đồng ý của Bên B. Theo Điều 29 BLLĐ, việc điều chuyển phải có lý do chính đáng và giới hạn 60 ngày/năm.',
    },
    {
      level: 'medium',
      title: 'Số ngày nghỉ phép thấp hơn quy định',
      description:
        'Hợp đồng ghi 10 ngày/năm, trong khi Điều 113 BLLĐ 2019 quy định tối thiểu 12 ngày/năm. Phép không dùng hết cũng không được quy đổi thành tiền là trái luật.',
    },
    {
      level: 'medium',
      title: 'Làm thêm giờ ngày lễ không rõ mức thanh toán',
      description:
        'Hợp đồng chỉ ghi "theo quy định nội bộ" mà không nêu cụ thể mức tiền OT, tạo rủi ro tranh chấp. Pháp luật quy định OT ngày lễ phải trả tối thiểu 300% lương.',
    },
    {
      level: 'low',
      title: 'Lương tháng 13 không cam kết',
      description: 'Không có cam kết rõ ràng về thưởng tháng 13, hoàn toàn phụ thuộc vào quyết định ban giám đốc.',
    },
  ],
  missing_clauses: [
    'Không có điều khoản về chế độ đào tạo và phát triển nghề nghiệp',
    'Không đề cập đến phụ cấp (ăn trưa, xăng xe, điện thoại...)',
    'Thiếu điều khoản về bảo hiểm tai nạn lao động',
    'Không có quy định về quy trình xử lý kỷ luật lao động',
    'Thiếu điều khoản về quyền sở hữu trí tuệ đối với sản phẩm tạo ra trong thời gian làm việc',
  ],
  suggestions: [
    'Yêu cầu sửa điều khoản BHXH: đóng trên mức lương thực tế 15 triệu đồng',
    'Xóa hoặc thu hẹp phạm vi điều khoản non-compete — chỉ giới hạn vào danh sách khách hàng/đối tác cụ thể',
    'Điều chỉnh thời gian báo trước chấm dứt hợp đồng của Bên A lên tối thiểu 30 ngày',
    'Sửa số ngày nghỉ phép từ 10 lên 12 ngày/năm theo đúng quy định pháp luật',
    'Bổ sung phụ lục về mức OT cụ thể (ít nhất bằng quy định pháp luật)',
    'Bỏ điều khoản Bên A đơn phương giảm lương — mọi thay đổi lương phải có phụ lục ký kết',
    'Tham vấn luật sư lao động trước khi ký — hợp đồng này có nhiều điểm bất lợi nghiêm trọng',
  ],
  overall_risk: 'high',
}
