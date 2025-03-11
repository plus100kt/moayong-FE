export const fetchAttendance = async () => {
  // 실제 API 요청 (주석 해제 시 적용)
  /*
  try {
    const response = await fetch("/api/attendance");
    if (!response.ok) {
      throw new Error("출석 정보를 불러오는 데 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { dates: [], isChecked: false };
  }
  */

  // 목 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        dates: [new Date('2025-03-01'), new Date('2025-03-02'), new Date('2025-03-03')],
        isChecked: false,
      });
    }, 500);
  });
};

export const postAttendance = async () => {
  // 실제 API 요청 (주석 해제 시 적용)
  /*
  try {
    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("출석 체크에 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
  */

  // 목 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};